const Employee = require("../../models/Employee");
const bcrypt = require("bcryptjs");
const { success, error } = require("../../utils/response");

exports.createEmployee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employeeData = { ...req.body, password: hashedPassword };

    Employee.create(employeeData, (err, _result) => {
      if (err) return error(res, err);
      return success(res, {}, "Employee created successfully");
    });
  } catch (err) {
    return error(res, err);
  }
};

exports.getAllEmployees = (_req, res) => {
  Employee.findAll((err, result) => {
    if (err) return error(res, err);

    success(res, result, "Employees retrieved successfully");
  });
};

exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  if (!id) return error(res, "ID is required", 400);

  Employee.findById(id, (err, result) => {
    if (err) return error(res, err);
    if (result.length === 0) return error(res, "Employee not found", 404);

    return success(res, result[0], "Employee found");
  });
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) return error(res, "ID is required", 400);

  // Check if the password is being updated with hashing
  if (data.password) {
    bcrypt.hash(data.password, 10, (err, hashed) => {
      if (err) return error(res, err);
      data.password = hashed;
      Employee.update(id, data, handleUpdate);
    });
  } else {
    Employee.update(id, data, handleUpdate);
  }

  function handleUpdate(err, _result) {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return error(res, "Invalid department ID", 400);
      }
      return error(res, err);
    }

    return success(res, {}, "Employee updated successfully");
  }
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  Employee.delete(id, (err, _result) => {
    if (err) return error(res, err);

    return success(res, {}, "Employee deleted successfully");
  });
};
