const Department = require("../../models/Department");
const { success, error } = require("../../utils/response");

exports.get = (req, res) => {
  const { id } = req.params;

  if (!id) return error(res, "ID is required", 400);
  Department.find(id, (err, result) => {
    if (err) return error(res, err);
    return success(req, res, result, "Department created successfully", 200);
  });
};

exports.createDepartment = (req, res) => {
  Department.create(req.body, (err, _result) => {
    if (err) return error(res, err);
    return success(req, res, {}, "Department created successfully", 201);
  });
};

exports.getAllDepartments = (req, res) => {
  const { page = 1, page_size = 5, search } = req.query;

  Department.countAll({ search }, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].count || 0;

    Department.findAll({ page, page_size, search }, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return success(req, res, results, "Fetched successfully", 200, {
        page,
        page_size,
        total,
      });
    });
  });
};

exports.updateDepartment = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  Department.updateById(id, dataToUpdate, (err, result) => {
    if (err) return error(res, err);
    if (result.affectedRows === 0)
      return error(res, "Department not found", 404);

    return success(req, res, {}, "Department updated successfully");
  });
};

exports.deleteDepartment = (req, res) => {
  const { id } = req.params;

  Department.deleteById(id, (err, result) => {
    if (err) return error(res, err);
    if (result.affectedRows === 0)
      return error(res, "Department not found", 404);

    return success(req, res, {}, "Department deleted successfully");
  });
};
