const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentController");
const {
  departmentValidationRules,
  updateDepartmentValidationRules,
} = require("../validators/departmentValidator");
const { validationResult } = require("express-validator");

router.get("/getAll", controller.getAllDepartments);
router.post("/create", departmentValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  controller.createDepartment(req, res);
});
router.post("/update/:id", updateDepartmentValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  controller.updateDepartment(req, res);
});

module.exports = router;
