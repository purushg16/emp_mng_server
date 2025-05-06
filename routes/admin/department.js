const express = require("express");
const departmentController = require("../../controllers/admin/departmentController");
const {
  departmentValidationRules,
  updateDepartmentValidationRules,
} = require("../../validators/departmentValidator");
const validate = require("../../middleware/validate");

const router = express.Router();

router.get("/getAll", departmentController.getAllDepartments);

router.post(
  "/create",
  departmentValidationRules,
  validate,
  departmentController.createDepartment
);

router.post(
  "/update/:id",
  updateDepartmentValidationRules,
  validate,
  departmentController.updateDepartment
);

router.delete("/delete/:id", departmentController.deleteDepartment);

module.exports = router;
