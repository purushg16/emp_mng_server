const Department = require("../models/Department");

exports.createDepartment = (req, res) => {
  Department.create(req.body, (err, _result) => {
    if (err)
      return res.status(500).json({ message: "Error creating department" });
    res.status(201).json({ message: "Department created successfully" });
  });
};

exports.getAllDepartments = (_req, res) => {
  Department.findAll((err, departments) => {
    if (err)
      return res.status(500).json({ message: "Error fetching departments" });
    res.status(200).json(departments);
  });
};

exports.updateDepartment = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const dataToUpdate = req.body;

  Department.updateById(id, dataToUpdate, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Department not found" });

    res.json({ message: "Department updated successfully" });
  });
};
