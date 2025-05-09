function buildLeaveFilters({ status = null, employeeId = null }) {
  const conditions = [];
  const values = [];

  if (status) {
    conditions.push("l.status = ?");
    values.push(status);
  }

  if (employeeId) {
    conditions.push("l.employeeId = ?");
    values.push(employeeId);
  }

  const whereClause =
    conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "";
  return { whereClause, values };
}

module.exports = { buildLeaveFilters };
