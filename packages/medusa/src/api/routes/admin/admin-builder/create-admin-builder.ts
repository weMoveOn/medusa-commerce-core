import { IsBoolean, IsNumber, IsString } from "class-validator"

import { validator } from "../../../../utils/validator"
import AdminBuilderService from "../../../../services/admin-builder"

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
  } else {
    res.status(201).json({
      data: {
        success: false,
        message: "Type does't exist",
      },
    })
  }

  const AdminBuilder: AdminBuilderService = req.scope.resolve(
    "adminBuilderService"
  )

  try {
    const result = await AdminBuilder.create(validated)
    res.status(201).json({
      success: true,
      data: result,
      message: "Data is successfully created",
    })
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Failed to create",
    })
  }
}
// Boolean
export class AdminBuilderBooleanPostReq {
  @IsBoolean({ message: "Value must be a boolean" })
  value: boolean

  @IsString({ message: "Type must be a string" })
  type: string

  @IsString({ message: "ID must be a string" })
  property_id: string
}

// Number
export class AdminBuilderNumberPostReq {
  @IsNumber({}, { message: "Value must be a number" })
  value: number

  @IsString({ message: "Type must be a string" })
  type: string

  @IsString({ message: "ID must be a string" })
  property_id: string
}

// String
export class AdminBuilderStringPostReq {
  @IsString({ message: "Value must be a string" })
  value: string

  @IsString({ message: "Type must be a string" })
  type: string

  @IsString({ message: "ID must be a string" })
  property_id: string
}
