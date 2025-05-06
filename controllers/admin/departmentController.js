const Department = require("../../models/Department");
const { success, error } = require("../../utils/response");

exports.createDepartment = (req, res) => {
  Department.create(req.body, (err, _result) => {
    if (err) return error(res, err);
    return success(res, {}, "Department created successfully", 201);
  });
};

exports.getAllDepartments = (_req, res) => {
  Department.findAll((err, departments) => {
    if (err) return error(res, err);
    return success(res, departments, "Departments fetched successfully", 201);
  });
};

exports.updateDepartment = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  Department.updateById(id, dataToUpdate, (err, result) => {
    if (err) return error(res, err);
    if (result.affectedRows === 0)
      return error(res, "Department not found", 404);

    return success(res, {}, "Department updated successfully");
  });
};

exports.deleteDepartment = (req, res) => {
  const { id } = req.params;

  Department.deleteById(id, (err, result) => {
    if (err) return error(res, err);
    if (result.affectedRows === 0)
      return error(res, "Department not found", 404);

    return success(res, {}, "Department deleted successfully");
  });
};
