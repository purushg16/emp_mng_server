const Employee = require("../../models/Employee");
const bcrypt = require("bcryptjs");
const { success, error } = require("../../utils/response");

exports.createEmployee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employeeData = {
      ...req.body,
      password: hashedPassword,
      birthday: new Date(req.body.birthday),
    };
    Employee.create(employeeData, (err, _result) => {
      if (err) return error(res, err);
      return success(req, res, {}, "Employee created successfully");
    });
  } catch (err) {
    return error(res, err);
  }
};

exports.getAllEmployees = (req, res) => {
  const { page = 1, page_size = 10, search = "" } = req.query;

  Employee.countAll({ search }, (err, countResult) => {
    if (err) return error(res, err);

    const total = countResult[0]?.count || 0;

    Employee.findAll({ page, page_size, search }, (err, result) => {
      if (err) return error(res, err);

      success(req, res, result, "Employee Retrieved successfully", 200, {
        page,
        page_size,
        total,
      });
    });
  });
};

exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  if (!id) return error(res, "ID is required", 400);

  Employee.findById(id, (err, result) => {
    if (err) return error(res, err);
    if (result.length === 0) return error(res, "Employee not found", 404);

    return success(req, res, result[0], "Employee found");
  });
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (data.birthday) {
    data.birthday = new Date(data.birthday);
  }

  if (data.password) {
    delete data.password;
  }

  if (!id) return error(res, "ID is required", 400);
  Employee.update(id, data, handleUpdate, true);

  function handleUpdate(err, _result) {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return error(res, "Invalid department ID", 400);
      }
      return error(res, err);
    }

    return success(req, res, {}, "Employee updated successfully");
  }
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  Employee.delete(id, (err, _result) => {
    if (err) return error(res, err);

    return success(req, res, {}, "Employee deleted successfully");
  });
};
