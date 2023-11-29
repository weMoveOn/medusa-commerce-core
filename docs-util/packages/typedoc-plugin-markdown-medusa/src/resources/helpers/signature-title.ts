import * as Handlebars from "handlebars"
import {
  ParameterReflection,
  ReflectionKind,
  SignatureReflection,
} from "typedoc"
import { getHTMLChar, memberSymbol } from "../../utils"
import { MarkdownTheme } from "../../theme"

export default function (theme: MarkdownTheme) {
  Handlebars.registerHelper(
    "signatureTitle",
    function (this: SignatureReflection, accessor?: string, standalone = true) {
      const { sections, expandMembers = false } =
        theme.getFormattingOptionsForLocation()
      if (sections && sections.member_signature_title === false) {
        // only show title if there are more than one signatures
        if (!this.parent.signatures || this.parent.signatures.length <= 1) {
          return ""
        }
      }
      const md: string[] = []

      if (!expandMembers) {
        md.push("`")
      }

      if (standalone && !theme.hideMembersSymbol) {
        md.push(`${memberSymbol(this)} `)
      }

      if (this.parent && this.parent.flags?.length > 0) {
        md.push(this.parent.flags.join(" ") + " ")
      }

      if (accessor) {
        md.push(
          `${accessor}${
            expandMembers ? `${Handlebars.helpers.titleLevel(4)} ` : "**"
          }${this.name}${!expandMembers ? "**" : ""}`
        )
      } else if (this.name !== "__call" && this.name !== "__type") {
        md.push(
          `${expandMembers ? `${Handlebars.helpers.titleLevel(4)} ` : "**"}${
            this.name
          }${!expandMembers ? "**" : ""}`
        )
      }

      if (this.typeParameters) {
        md.push(
          `${expandMembers ? getHTMLChar("<") : "<"}${this.typeParameters.join(
            ", "
          )}${expandMembers ? getHTMLChar(">") : ">"}`
        )
      }
      md.push(`(${getParameters(this.parameters, false)})`)

      if (this.type && !this.parent?.kindOf(ReflectionKind.Constructor)) {
        md.push(`: ${Handlebars.helpers.type.call(this.type, "none", false)}`)
      }

      if (!expandMembers) {
        md.push("`")
      }
      return md.join("") + (standalone ? "\n" : "")
    }
  )
}

const getParameters = (
  parameters: ParameterReflection[] = [],
  backticks = true
) => {
  return parameters
    .map((param) => {
      const isDestructuredParam = param.name == "__namedParameters"
      const paramItem = `${param.flags.isRest ? "..." : ""}${
        isDestructuredParam ? "«destructured»" : param.name
      }${param.flags.isOptional || param.defaultValue ? "?" : ""}`
      return backticks ? `\`${paramItem}\`` : paramItem
    })
    .join(", ")
}
