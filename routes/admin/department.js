const express = require("express");
const departmentController = require("../../controllers/admin/departmentController");
const {
  departmentSchema,
  updateDepartmentSchema,
} = require("../../validators/departmentValidator");
const validate = require("../../middleware/validate");

const router = express.Router();

router.get("/get/:id", departmentController.get);
router.get("/getAll", departmentController.getAllDepartments);

router.post(
  "/create",
  validate(departmentSchema),
  departmentController.createDepartment
);

router.post(
  "/update/:id",
  validate(updateDepartmentSchema),
  departmentController.updateDepartment
);

router.delete("/delete/:id", departmentController.deleteDepartment);

module.exports = router;
