import {
  Application,
  Context,
  Converter,
  ParameterType,
  ReflectionKind,
} from "typedoc"

export function load(app: Application) {
  app.options.addDeclaration({
    name: "ignoreApi",
    help: "Whether to ignore items with the `@apiIgnore` tag.",
    type: ParameterType.Boolean, // The default
    defaultValue: false,
  })

  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context: Context) => {
    for (const reflection of context.project.getReflectionsByKind(
      ReflectionKind.All
    )) {
      if (reflection.comment?.hasModifier("@apiIgnore")) {
        if (app.options.getValue("ignoreApi")) {
          context.project.removeReflection(reflection)
        } else {
          reflection.comment.removeModifier(`@apiIgnore`)
        }
      }
    }
  })
}
