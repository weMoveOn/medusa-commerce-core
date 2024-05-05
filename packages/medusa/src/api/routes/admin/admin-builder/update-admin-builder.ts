import { IsBoolean, IsNumber, IsString } from "class-validator"

import { validator } from "../../../../utils/validator"
import AdminBuilderService from "../../../../services/admin-builder"

export default async (req, res) => {
  const AdminBuilder: AdminBuilderService = req.scope.resolve(
    "adminBuilderService"
  )

  try {
    const result = await AdminBuilder.update(req.body, req.body.property_id)
    res.status(201).json({
      success: true,
      data: result,
      message: "Data is successfully updated",
    })
  } catch (error) {
    res.status(406).json({
      success: false,
      message: "Failed to update",
    })
  }
}
