const Log = require("../model/log-model");
const logController = {};

logController.create = async (req, res) => {
  try {
    const body = req.body;
    body.userId = req.user.id;
    console.log(body);
    const log = await Log.create(body);
    return res.json(log);
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

logController.show = async (req, res) => {
  try {
    const logList = await Log.find({
      userId: req.user.id,
      taskId: req.params.id,
    });
    return res.json(logList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = logController;
