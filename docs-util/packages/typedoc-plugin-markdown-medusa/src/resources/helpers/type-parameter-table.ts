import * as Handlebars from "handlebars"
import { TypeParameterReflection } from "typedoc"
import {
  getTableHeaders,
  reflectionTableFormatter,
} from "../../utils/reflection-formatter"
import { hasTypes } from "../../utils/type-utils"

export default function () {
  Handlebars.registerHelper(
    "typeParameterTable",
    function (this: TypeParameterReflection[]) {
      const showTypeCol = hasTypes(this)
      const headers = getTableHeaders(this, showTypeCol)

      const rows = this.map((parameter) => reflectionTableFormatter(parameter))

      return `\n| ${headers.join(" | ")} |\n| ${headers
        .map(() => ":------")
        .join(" | ")} |\n${rows.join("")}`
    }
  )
}
