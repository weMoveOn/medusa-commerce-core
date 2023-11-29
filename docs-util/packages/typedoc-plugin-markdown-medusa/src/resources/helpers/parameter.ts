import * as Handlebars from "handlebars"
import { MarkdownTheme } from "../../theme"
import { ParameterReflection } from "typedoc"

export default function (theme: MarkdownTheme) {
  Handlebars.registerHelper(
    "parameter",
    function (this: ParameterReflection[]) {
      const { parameterStyle } = theme.getFormattingOptionsForLocation()

      if (parameterStyle === "list") {
        return Handlebars.helpers.parameterList.call(this)
      } else if (parameterStyle === "component") {
        return Handlebars.helpers.parameterComponent.call(this)
      } else {
        return Handlebars.helpers.parameterTable.call(this)
      }
    }
  )
}
