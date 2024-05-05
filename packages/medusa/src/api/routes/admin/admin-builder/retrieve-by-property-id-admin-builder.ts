import { IsBoolean, IsNumber, IsString } from "class-validator"

import { validator } from "../../../../utils/validator"
import AdminBuilderService from "../../../../services/admin-builder"

export default async (req, res) => {
  const AdminBuilder: AdminBuilderService = req.scope.resolve(
    "adminBuilderService"
  )

  try {
    const { property_id } = req.params
    const result = await AdminBuilder.getByPropertyId(property_id)
    res.status(201).json({
      success: true,
      data: result,
      message: "Data is successfully retrieve",
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve",
    })
  }
}
