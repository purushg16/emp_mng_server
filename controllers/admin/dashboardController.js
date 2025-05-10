const Dashboard = require("../../models/dashboard");
const { error, success } = require("../../utils/response");

exports.getDashboardStats = (req, res) => {
  Dashboard.findStats((err, result) => {
    if (err) return error(res, err, 500);

    return success(req, res, result[0], "Dashboard stats fetched", 200);
  });
};
