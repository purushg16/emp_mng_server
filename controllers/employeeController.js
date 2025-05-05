const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

exports.createEmployee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employeeData = { ...req.body, password: hashedPassword };

    Employee.create(employeeData, (err, _result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Employee created successfully" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEmployees = (_req, res) => {
  Employee.findAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID is required" });

  Employee.findById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json(result[0]);
  });
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) return res.status(400).json({ error: "ID is required" });

  // Check if the password is being updated with hashing
  if (data.password) {
    bcrypt.hash(data.password, 10, (err, hashed) => {
      if (err) return res.status(500).json({ error: err.message });
      data.password = hashed;
      Employee.update(id, data, handleUpdate);
    });
  } else {
    Employee.update(id, data, handleUpdate);
  }

  function handleUpdate(err, _result) {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({ error: "Invalid department ID" });
      }
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Employee updated successfully" });
  }
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  Employee.delete(id, (err, _result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Employee deleted successfully" });
  });
};
