import * as Handlebars from "handlebars"
import { Comment } from "typedoc"

const EXCLUDED_TAGS = ["@returns", "@example", "@featureFlag"]

export default function () {
  Handlebars.registerHelper(
    "comments",
    function (
      comment: Comment,
      showSummary = true,
      showTags = true,
      commentLevel = 4,
      parent = null
    ) {
      const md: string[] = []

      if (showSummary && comment.summary) {
        md.push(Handlebars.helpers.comment(comment.summary))
      }

      if (showTags && comment.blockTags?.length) {
        const filteredTags = comment.blockTags.filter(
          (tag) => !EXCLUDED_TAGS.includes(tag.tag)
        )
        const tags = filteredTags.map((tag) => {
          return Handlebars.helpers.commentTag(
            tag,
            commentLevel,
            parent || comment
          )
        })
        md.push(tags.join("\n\n"))
      }

      return md.join("\n\n")
    }
  )
}
