const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/admin/employeeController");
const {
  addEmployeeSchema,
  updateEmployeeSchema,
} = require("../../validators/employeeValidator");
const validate = require("../../middleware/validate");

router.get("/getAll", employeeController.getAllEmployees);
router.get("/get/:id", employeeController.getEmployeeById);

router.post(
  "/create",
  validate(addEmployeeSchema),
  employeeController.createEmployee
);
router.put(
  "/update/:id",
  validate(updateEmployeeSchema),
  employeeController.updateEmployee
);

router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
