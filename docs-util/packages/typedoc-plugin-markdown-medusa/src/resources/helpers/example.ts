import * as Handlebars from "handlebars"
import { Reflection } from "typedoc"

export default function () {
  Handlebars.registerHelper(
    "example",
    function (reflection: Reflection, commentLevel = 4) {
      const exampleTag = reflection.comment?.blockTags.find(
        (tag) => tag.tag === "@example"
      )

      if (!exampleTag) {
        return ""
      }

      return Handlebars.helpers.commentTag(exampleTag, commentLevel, reflection)
    }
  )
}
