import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator"

import { CustomerService } from "../../../../services"
import { validator } from "../../../../utils/validator"
import { EntityManager } from "typeorm"


export default async (req, res) => {
  let validated
  // Validation for Boolean
  if (req.body.type === "checkbox") {
    validated = await validator(AdminBuilderBooleanPostReq, req.body)
  }
      // Validation for Number
      else if (req.body.type === "range") {
        validated = await validator(AdminBuilderNumberPostReq, req.body)
  }
      // Validation for String
      else if (
        req.body.type === "text" ||
        req.body.type === "textarea" ||
        req.body.type === "color" ||
        req.body.type === "url" ||
        req.body.type === "select" ||
        req.body.type === "font_picker" ||
        req.body.type === "image_picker"
      ) {
        validated = await validator(AdminBuilderStringPostReq, req.body)
  }
  else{
    res.status(201).json({ data: {
        success: false,
        message: "Type does't exist"
      } })
  }



  // const customerService: CustomerService = req.scope.resolve("customerService")
  // const manager: EntityManager = req.scope.resolve("manager")
  // const customer = await manager.transaction(async (transactionManager) => {
  //   return await customerService
  //     .withTransaction(transactionManager)
  //     .create(validated)
  // })
  res.status(201).json({ data: {
    success: true,
      data:validated
    } })
}
// Boolean
export class AdminBuilderBooleanPostReq {
  @IsBoolean({ message: 'Value must be a boolean' })
  value: boolean

  @IsString({ message: 'Type must be a string' })
  type: string

  @IsString({ message: 'ID must be a string' })
  id: string
}

// Number
export class AdminBuilderNumberPostReq {
  @IsNumber({}, { message: 'Value must be a number' })
  value: number;

  @IsString({ message: 'Type must be a string' })
  type: string

  @IsString({ message: 'ID must be a string' })
  id: string
}

// String
export class AdminBuilderStringPostReq {
  @IsString({ message: 'Value must be a string' })
  value: string

  @IsString({ message: 'Type must be a string' })
  type: string

  @IsString({ message: 'ID must be a string' })
  id: string
}
