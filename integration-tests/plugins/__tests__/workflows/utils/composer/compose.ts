import { promiseAll } from "@medusajs/utils"
import {
  createStep,
  createWorkflow,
  hook,
  parallelize,
  StepResponse,
  transform,
} from "@medusajs/workflows-sdk"

jest.setTimeout(30000)

describe("Workflow composer", function () {
  describe("Using steps returning plain values", function () {
    afterEach(async () => {
      jest.clearAllMocks()
    })

    it("should compose a new workflow and execute it", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input) => {
        return { inputs: [input], obj: "return from 1" }
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: {
          inputs: [workflowInput],
          obj: "return from 1",
        },
        two: {
          inputs: [
            {
              inputs: [workflowInput],
              obj: "return from 1",
            },
          ],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: {
              inputs: [workflowInput],
              obj: "return from 1",
            },
            two: {
              inputs: [
                {
                  inputs: [workflowInput],
                  obj: "return from 1",
                },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose two new workflows sequentially and execute them sequentially", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return { inputs: [input], obj: "return from 1" }
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflow2 = createWorkflow("workflow2", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      const workflow2Input = { test: "payload2" }
      const { result: workflow2Result } = await workflow2().run({
        input: workflow2Input,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1][0]).toEqual(workflow2Input)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [{ test: "payload1" }],
        obj: "return from 1",
      })
      expect(mockStep2Fn.mock.calls[1][0]).toEqual({
        inputs: [{ test: "payload2" }],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })
      expect(mockStep3Fn.mock.calls[1][0]).toEqual({
        one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload2" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflow2Result).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose two new workflows concurrently and execute them sequentially", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return { inputs: [input], obj: "return from 1" }
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const [workflow, workflow2] = await promiseAll([
        createWorkflow("workflow1", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),

        createWorkflow("workflow2", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),
      ])

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      const workflow2Input = { test: "payload2" }
      const { result: workflow2Result } = await workflow2().run({
        input: workflow2Input,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1][0]).toEqual(workflow2Input)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })
      expect(mockStep2Fn.mock.calls[1][0]).toEqual({
        inputs: [workflow2Input],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })
      expect(mockStep3Fn.mock.calls[1][0]).toEqual({
        one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload2" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflow2Result).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose two new workflows concurrently and execute them concurrently", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return { inputs: [input], obj: "return from 1" }
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const [workflow, workflow2] = await promiseAll([
        createWorkflow("workflow1", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),

        createWorkflow("workflow2", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),
      ])

      const workflowInput = { test: "payload1" }
      const workflow2Input = { test: "payload2" }

      const [{ result: workflowResult }, { result: workflow2Result }] =
        await promiseAll([
          workflow().run({
            input: workflowInput,
          }),
          workflow2().run({
            input: workflow2Input,
          }),
        ])

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1][0]).toEqual(workflow2Input)
      expect(mockStep1Fn.mock.calls[1]).toHaveLength(2)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })
      expect(mockStep2Fn.mock.calls[1][0]).toEqual({
        inputs: [workflow2Input],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })
      expect(mockStep3Fn.mock.calls[1][0]).toEqual({
        one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload2" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflow2Result).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose a new workflow and execute it multiple times concurrently", async () => {
      const mockStep1Fn = jest
        .fn()
        .mockImplementation(function (input, context) {
          return { inputs: [input], obj: "return from 1" }
        })
      const mockStep2Fn = jest.fn().mockImplementation(function (...inputs) {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation(function (...inputs) {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const workflowInput2 = { test: "payload2" }

      const [{ result: workflowResult }, { result: workflowResult2 }] =
        await promiseAll([
          workflow().run({
            input: workflowInput,
          }),
          workflow().run({
            input: workflowInput2,
          }),
        ])

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1]).toHaveLength(2)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflowResult2).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose a new workflow with parallelize steps", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return { inputs: [input], obj: "return from 1" }
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })
      const mockStep4Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 4",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)
      const step4 = createStep("step4", mockStep4Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const [ret2, ret3] = parallelize(step2(returnStep1), step3(returnStep1))
        return step4({ one: ret2, two: ret3 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep4Fn).toHaveBeenCalledTimes(1)
      expect(mockStep4Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep4Fn.mock.calls[0][0]).toEqual({
        one: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 3",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 3",
            },
          },
        ],
        obj: "return from 4",
      })
    })

    it("should overwrite existing workflows if the same name is used", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return { inputs: [input], obj: "return from 1" }
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 2",
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 3",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const overriddenWorkflow = createWorkflow("workflow1", function (input) {
        const ret2 = step2(input)
        const returnStep1 = step1(ret2)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await overriddenWorkflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 2",
      })

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 2" }],
          obj: "return from 1",
        },
        two: { inputs: [{ test: "payload1" }], obj: "return from 2" },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 2" },
              ],
              obj: "return from 1",
            },
            two: { inputs: [{ test: "payload1" }], obj: "return from 2" },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should transform the values before forward them to the next step", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((obj, context) => {
        const ret = {
          property: "property",
        }
        return ret
      })

      const mockStep2Fn = jest.fn().mockImplementation((obj, context) => {
        const ret = {
          ...obj,
          sum: "sum = " + obj.sum,
        }

        return ret
      })

      const mockStep3Fn = jest.fn().mockImplementation((param, context) => {
        const ret = {
          avg: "avg = " + param.avg,
          ...param,
        }
        return ret
      })

      const transform1Fn = jest
        .fn()
        .mockImplementation(({ input, step1Result }) => {
          const newObj = {
            ...step1Result,
            ...input,
            sum: input.a + input.b,
          }
          return {
            input: newObj,
          }
        })

      const transform2Fn = jest
        .fn()
        .mockImplementation(async ({ input }, context) => {
          input.another_prop = "another_prop"
          return input
        })

      const transform3Fn = jest.fn().mockImplementation(({ obj }) => {
        obj.avg = (obj.a + obj.b) / 2

        return obj
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const mainFlow = createWorkflow("test_", function (input) {
        const step1Result = step1(input)

        const sum = transform(
          { input, step1Result },
          transform1Fn,
          transform2Fn
        )

        const ret2 = step2(sum)

        const avg = transform({ obj: ret2 }, transform3Fn)

        return step3(avg)
      })

      const workflowInput = { a: 1, b: 2 }
      await mainFlow().run({ input: workflowInput })

      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        property: "property",
        a: 1,
        b: 2,
        sum: 3,
        another_prop: "another_prop",
      })

      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        sum: "sum = 3",
        property: "property",
        a: 1,
        b: 2,
        another_prop: "another_prop",
        avg: 1.5,
      })

      expect(transform1Fn).toHaveBeenCalledTimes(1)
      expect(transform2Fn).toHaveBeenCalledTimes(1)
      expect(transform3Fn).toHaveBeenCalledTimes(1)
    })

    it("should compose a new workflow and access properties from steps", async () => {
      const mockStep1Fn = jest.fn().mockImplementation(({ input }, context) => {
        return { id: input, product: "product_1", variant: "variant_2" }
      })
      const mockStep2Fn = jest.fn().mockImplementation(({ product }) => {
        return {
          product: "Saved product - " + product,
        }
      })
      const mockStep3Fn = jest.fn().mockImplementation(({ variant }) => {
        return {
          variant: "Saved variant - " + variant,
        }
      })

      const getData = createStep("step1", mockStep1Fn)
      const saveProduct = createStep("step2", mockStep2Fn)
      const saveVariant = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const data: any = getData(input)
        parallelize(
          saveProduct({ product: data.product }),
          saveVariant({ variant: data.variant })
        )
      })

      const workflowInput = "id_123"
      await workflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({ product: "product_1" })

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({ variant: "variant_2" })
    })

    it("should compose a new workflow exposing hooks and log warns if multiple handlers are registered for the same hook", async () => {
      const warn = jest.spyOn(console, "warn").mockImplementation(() => {})

      const mockStep1Fn = jest.fn().mockImplementation(({ input }) => {
        return { id: input, product: "product_1", variant: "variant_2" }
      })

      const mockStep2Fn = jest.fn().mockImplementation(({ product }) => {
        product.product = "Saved product - " + product.product
        return product
      })

      const getData = createStep("step1", mockStep1Fn)
      const saveProduct = createStep("step2", mockStep2Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const data = getData({ input })

        const hookReturn = hook("changeProduct", {
          opinionatedPropertyName: data,
        })
        const transformedData = transform(
          { data, hookReturn },
          ({ data, hookReturn }: { data: any; hookReturn: any }) => {
            return {
              ...data,
              ...hookReturn,
            }
          }
        )

        return saveProduct({ product: transformedData })
      })

      workflow.changeProduct(({ opinionatedPropertyName }) => {
        return {
          newProperties: "new properties",
          prod: opinionatedPropertyName.product + "**",
          var: opinionatedPropertyName.variant + "**",
          other: [1, 2, 3],
          nested: {
            a: {
              b: "c",
            },
          },
          moreProperties: "more properties",
        }
      })

      workflow.changeProduct((theReturnOfThePreviousHook) => {
        return {
          ...theReturnOfThePreviousHook,
          moreProperties: "2nd hook update",
        }
      })

      const workflowInput = "id_123"
      const { result: final } = await workflow().run({
        input: workflowInput,
      })

      expect(warn).toHaveBeenCalledTimes(1)
      expect(final).toEqual({
        id: "id_123",
        prod: "product_1**",
        var: "variant_2**",
        variant: "variant_2",
        product: "Saved product - product_1",
        newProperties: "new properties",
        other: [1, 2, 3],
        nested: {
          a: {
            b: "c",
          },
        },
        moreProperties: "more properties",
      })
    })
  })

  describe("Using steps returning StepResponse", function () {
    afterEach(async () => {
      jest.clearAllMocks()
    })

    it("should compose a new workflow and execute it", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input) => {
        return new StepResponse({ inputs: [input], obj: "return from 1" })
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: {
          inputs: [workflowInput],
          obj: "return from 1",
        },
        two: {
          inputs: [
            {
              inputs: [workflowInput],
              obj: "return from 1",
            },
          ],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: {
              inputs: [workflowInput],
              obj: "return from 1",
            },
            two: {
              inputs: [
                {
                  inputs: [workflowInput],
                  obj: "return from 1",
                },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose two new workflows sequentially and execute them sequentially", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return new StepResponse({ inputs: [input], obj: "return from 1" })
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflow2 = createWorkflow("workflow2", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      const workflow2Input = { test: "payload2" }
      const { result: workflow2Result } = await workflow2().run({
        input: workflow2Input,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1][0]).toEqual(workflow2Input)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [{ test: "payload1" }],
        obj: "return from 1",
      })
      expect(mockStep2Fn.mock.calls[1][0]).toEqual({
        inputs: [{ test: "payload2" }],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })
      expect(mockStep3Fn.mock.calls[1][0]).toEqual({
        one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload2" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflow2Result).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose two new workflows concurrently and execute them sequentially", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return new StepResponse({ inputs: [input], obj: "return from 1" })
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const [workflow, workflow2] = await promiseAll([
        createWorkflow("workflow1", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),

        createWorkflow("workflow2", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),
      ])

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      const workflow2Input = { test: "payload2" }
      const { result: workflow2Result } = await workflow2().run({
        input: workflow2Input,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1][0]).toEqual(workflow2Input)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })
      expect(mockStep2Fn.mock.calls[1][0]).toEqual({
        inputs: [workflow2Input],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })
      expect(mockStep3Fn.mock.calls[1][0]).toEqual({
        one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload2" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflow2Result).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose two new workflows concurrently and execute them concurrently", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return new StepResponse({ inputs: [input], obj: "return from 1" })
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const [workflow, workflow2] = await promiseAll([
        createWorkflow("workflow1", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),

        createWorkflow("workflow2", function (input) {
          const returnStep1 = step1(input)
          const ret2 = step2(returnStep1)
          return step3({ one: returnStep1, two: ret2 })
        }),
      ])

      const workflowInput = { test: "payload1" }
      const workflow2Input = { test: "payload2" }

      const [{ result: workflowResult }, { result: workflow2Result }] =
        await promiseAll([
          workflow().run({
            input: workflowInput,
          }),
          workflow2().run({
            input: workflow2Input,
          }),
        ])

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1][0]).toEqual(workflow2Input)
      expect(mockStep1Fn.mock.calls[1]).toHaveLength(2)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })
      expect(mockStep2Fn.mock.calls[1][0]).toEqual({
        inputs: [workflow2Input],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })
      expect(mockStep3Fn.mock.calls[1][0]).toEqual({
        one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload2" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflow2Result).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose a new workflow and execute it multiple times concurrently", async () => {
      const mockStep1Fn = jest
        .fn()
        .mockImplementation(function (input, context) {
          return new StepResponse({ inputs: [input], obj: "return from 1" })
        })
      const mockStep2Fn = jest.fn().mockImplementation(function (...inputs) {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation(function (...inputs) {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const workflowInput2 = { test: "payload2" }

      const [{ result: workflowResult }, { result: workflowResult2 }] =
        await promiseAll([
          workflow().run({
            input: workflowInput,
          }),
          workflow().run({
            input: workflowInput2,
          }),
        ])

      expect(mockStep1Fn).toHaveBeenCalledTimes(2)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
      expect(mockStep1Fn.mock.calls[1]).toHaveLength(2)

      expect(mockStep2Fn).toHaveBeenCalledTimes(2)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(2)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload1" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
      expect(workflowResult2).toEqual({
        inputs: [
          {
            one: { inputs: [{ test: "payload2" }], obj: "return from 1" },
            two: {
              inputs: [
                { inputs: [{ test: "payload2" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should compose a new workflow with parallelize steps", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return new StepResponse({ inputs: [input], obj: "return from 1" })
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })
      const mockStep4Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return {
          inputs,
          obj: "return from 4",
        }
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)
      const step4 = createStep("step4", mockStep4Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const [ret2, ret3] = parallelize(step2(returnStep1), step3(returnStep1))
        return step4({ one: ret2, two: ret3 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await workflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 1",
      })

      expect(mockStep4Fn).toHaveBeenCalledTimes(1)
      expect(mockStep4Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep4Fn.mock.calls[0][0]).toEqual({
        one: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 2",
        },
        two: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 1" }],
          obj: "return from 3",
        },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 2",
            },
            two: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 1" },
              ],
              obj: "return from 3",
            },
          },
        ],
        obj: "return from 4",
      })
    })

    it("should overwrite existing workflows if the same name is used", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((input, context) => {
        return new StepResponse({ inputs: [input], obj: "return from 1" })
      })
      const mockStep2Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 2",
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation((...inputs) => {
        const context = inputs.pop()
        return new StepResponse({
          inputs,
          obj: "return from 3",
        })
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      createWorkflow("workflow1", function (input) {
        const returnStep1 = step1(input)
        const ret2 = step2(returnStep1)
        return step3({ one: returnStep1, two: ret2 })
      })

      const overriddenWorkflow = createWorkflow("workflow1", function (input) {
        const ret2 = step2(input)
        const returnStep1 = step1(ret2)
        return step3({ one: returnStep1, two: ret2 })
      })

      const workflowInput = { test: "payload1" }
      const { result: workflowResult } = await overriddenWorkflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual({
        inputs: [workflowInput],
        obj: "return from 2",
      })

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        one: {
          inputs: [{ inputs: [{ test: "payload1" }], obj: "return from 2" }],
          obj: "return from 1",
        },
        two: { inputs: [{ test: "payload1" }], obj: "return from 2" },
      })

      expect(workflowResult).toEqual({
        inputs: [
          {
            one: {
              inputs: [
                { inputs: [{ test: "payload1" }], obj: "return from 2" },
              ],
              obj: "return from 1",
            },
            two: { inputs: [{ test: "payload1" }], obj: "return from 2" },
          },
        ],
        obj: "return from 3",
      })
    })

    it("should transform the values before forward them to the next step", async () => {
      const mockStep1Fn = jest.fn().mockImplementation((obj, context) => {
        const ret = new StepResponse({
          property: "property",
        })
        return ret
      })

      const mockStep2Fn = jest.fn().mockImplementation((obj, context) => {
        const ret = new StepResponse({
          ...obj,
          sum: "sum = " + obj.sum,
        })

        return ret
      })

      const mockStep3Fn = jest.fn().mockImplementation((param, context) => {
        const ret = new StepResponse({
          avg: "avg = " + param.avg,
          ...param,
        })
        return ret
      })

      const transform1Fn = jest
        .fn()
        .mockImplementation(({ input, step1Result }) => {
          const newObj = {
            ...step1Result,
            ...input,
            sum: input.a + input.b,
          }
          return {
            input: newObj,
          }
        })

      const transform2Fn = jest
        .fn()
        .mockImplementation(async ({ input }, context) => {
          input.another_prop = "another_prop"
          return input
        })

      const transform3Fn = jest.fn().mockImplementation(({ obj }) => {
        obj.avg = (obj.a + obj.b) / 2

        return obj
      })

      const step1 = createStep("step1", mockStep1Fn)
      const step2 = createStep("step2", mockStep2Fn)
      const step3 = createStep("step3", mockStep3Fn)

      const mainFlow = createWorkflow("test_", function (input) {
        const step1Result = step1(input)

        const sum = transform(
          { input, step1Result },
          transform1Fn,
          transform2Fn
        )

        const ret2 = step2(sum)

        const avg = transform({ obj: ret2 }, transform3Fn)

        return step3(avg)
      })

      const workflowInput = { a: 1, b: 2 }
      await mainFlow().run({ input: workflowInput })

      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn.mock.calls[0][0]).toEqual({
        property: "property",
        a: 1,
        b: 2,
        sum: 3,
        another_prop: "another_prop",
      })

      expect(mockStep3Fn.mock.calls[0][0]).toEqual({
        sum: "sum = 3",
        property: "property",
        a: 1,
        b: 2,
        another_prop: "another_prop",
        avg: 1.5,
      })

      expect(transform1Fn).toHaveBeenCalledTimes(1)
      expect(transform2Fn).toHaveBeenCalledTimes(1)
      expect(transform3Fn).toHaveBeenCalledTimes(1)
    })

    it("should compose a new workflow and access properties from steps", async () => {
      const mockStep1Fn = jest.fn().mockImplementation(({ input }, context) => {
        return new StepResponse({
          id: input,
          product: "product_1",
          variant: "variant_2",
        })
      })
      const mockStep2Fn = jest.fn().mockImplementation(({ product }) => {
        return new StepResponse({
          product: "Saved product - " + product,
        })
      })
      const mockStep3Fn = jest.fn().mockImplementation(({ variant }) => {
        return new StepResponse({
          variant: "Saved variant - " + variant,
        })
      })

      const getData = createStep("step1", mockStep1Fn)
      const saveProduct = createStep("step2", mockStep2Fn)
      const saveVariant = createStep("step3", mockStep3Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const data: any = getData(input)
        parallelize(
          saveProduct({ product: data.product }),
          saveVariant({ variant: data.variant })
        )
      })

      const workflowInput = "id_123"
      await workflow().run({
        input: workflowInput,
      })

      expect(mockStep1Fn).toHaveBeenCalledTimes(1)
      expect(mockStep1Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)

      expect(mockStep2Fn).toHaveBeenCalledTimes(1)
      expect(mockStep2Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep2Fn.mock.calls[0][0]).toEqual({ product: "product_1" })

      expect(mockStep3Fn).toHaveBeenCalledTimes(1)
      expect(mockStep3Fn.mock.calls[0]).toHaveLength(2)
      expect(mockStep3Fn.mock.calls[0][0]).toEqual({ variant: "variant_2" })
    })

    it("should compose a new workflow exposing hooks and log warns if multiple handlers are registered for the same hook", async () => {
      const warn = jest.spyOn(console, "warn").mockImplementation(() => {})

      const mockStep1Fn = jest.fn().mockImplementation(({ input }) => {
        return new StepResponse({
          id: input,
          product: "product_1",
          variant: "variant_2",
        })
      })

      const mockStep2Fn = jest.fn().mockImplementation(({ product }) => {
        product.product = "Saved product - " + product.product
        return new StepResponse(product)
      })

      const getData = createStep("step1", mockStep1Fn)
      const saveProduct = createStep("step2", mockStep2Fn)

      const workflow = createWorkflow("workflow1", function (input) {
        const data = getData({ input })

        const hookReturn = hook("changeProduct", {
          opinionatedPropertyName: data,
        })
        const transformedData = transform(
          { data, hookReturn },
          ({ data, hookReturn }: { data: any; hookReturn: any }) => {
            return {
              ...data,
              ...hookReturn,
            }
          }
        )

        return saveProduct({ product: transformedData })
      })

      workflow.changeProduct(({ opinionatedPropertyName }) => {
        return {
          newProperties: "new properties",
          prod: opinionatedPropertyName.product + "**",
          var: opinionatedPropertyName.variant + "**",
          other: [1, 2, 3],
          nested: {
            a: {
              b: "c",
            },
          },
          moreProperties: "more properties",
        }
      })

      workflow.changeProduct((theReturnOfThePreviousHook) => {
        return {
          ...theReturnOfThePreviousHook,
          moreProperties: "2nd hook update",
        }
      })

      const workflowInput = "id_123"
      const { result: final } = await workflow().run({
        input: workflowInput,
      })

      expect(warn).toHaveBeenCalledTimes(1)
      expect(final).toEqual({
        id: "id_123",
        prod: "product_1**",
        var: "variant_2**",
        variant: "variant_2",
        product: "Saved product - product_1",
        newProperties: "new properties",
        other: [1, 2, 3],
        nested: {
          a: {
            b: "c",
          },
        },
        moreProperties: "more properties",
      })
    })
  })

  it("should compose a workflow that throws without crashing and the compensation will receive undefined for the step that fails", async () => {
    const mockStep1Fn = jest.fn().mockImplementation(function (input) {
      throw new Error("invoke fail")
    })

    const mockCompensateSte1 = jest.fn().mockImplementation(function (input) {
      return input
    })

    const step1 = createStep("step1", mockStep1Fn, mockCompensateSte1)

    const workflow = createWorkflow("workflow1", function (input) {
      return step1(input)
    })

    const workflowInput = { test: "payload1" }
    const { errors } = await workflow().run({
      input: workflowInput,
      throwOnError: false,
    })

    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual({
      action: "step1",
      handlerType: "invoke",
      error: expect.objectContaining({
        message: "invoke fail",
      }),
    })

    expect(mockStep1Fn).toHaveBeenCalledTimes(1)
    expect(mockCompensateSte1).toHaveBeenCalledTimes(1)

    expect(mockStep1Fn.mock.calls[0][0]).toEqual(workflowInput)
    expect(mockCompensateSte1.mock.calls[0][0]).toEqual(undefined)
  })
})
