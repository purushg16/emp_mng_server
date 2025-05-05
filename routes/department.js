const express = require("express");
const {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  updateDepartment,
} = require("../controllers/departmentController");
const {
  departmentValidationRules,
  updateDepartmentValidationRules,
} = require("../validators/departmentValidator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/getAll", getAllDepartments);

router.post("/create", departmentValidationRules, validate, createDepartment);

router.post(
  "/update/:id",
  updateDepartmentValidationRules,
  validate,
  updateDepartment
);

router.delete("/delete/:id", deleteDepartment);

module.exports = router;
