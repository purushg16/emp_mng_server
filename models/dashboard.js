const db = require("../config/db");

const Dashboard = {
  findStats: (cb) => {
    const statsQuery = `
      SELECT
        (SELECT COUNT(*) FROM employee) AS totalEmployees,
        (SELECT COUNT(*) FROM employee WHERE status = 'active') AS activeEmployees,
        (SELECT COUNT(*) FROM employee WHERE DATE(createdAt) >= CURDATE() - INTERVAL 30 DAY) AS newEmployees,
  
        (SELECT COUNT(*) FROM department) AS totalDepartments,
  
        (SELECT COUNT(*) FROM leaves) AS totalLeaves,
        (SELECT COUNT(*) FROM leaves WHERE status = 'pending') AS pendingLeaves,
        (SELECT COUNT(*) FROM leaves WHERE status = 'approved') AS approvedLeaves,
        (SELECT COUNT(*) FROM leaves WHERE status = 'rejected') AS rejectedLeaves,
  
        (SELECT COUNT(*) FROM leaves WHERE DATE(\`from\`) <= CURDATE() AND DATE(\`to\`) >= CURDATE() AND status = 'approved') AS employeesOnLeaveToday;
    `;

    const dateQuery = `
      SELECT \`from\`, \`to\` FROM leaves WHERE status = 'approved'
    `;

    db.query(statsQuery, (err, statsResult) => {
      if (err) return cb(err);

      db.query(dateQuery, (err2, dateRanges) => {
        if (err2) return cb(err2);

        const dates = [];

        dateRanges.forEach((range) => {
          const from = new Date(range.from);
          const to = new Date(range.to);
          for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d).toISOString().split("T")[0]);
          }
        });

        const stats = statsResult[0];
        // stats.approvedLeaveDates = [...new Set(dates)];
        stats.approvedLeaveDates = dates;
        cb(null, [stats]);
      });
    });
  },
};

module.exports = Dashboard;
