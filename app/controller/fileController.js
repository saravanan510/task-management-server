const File = require("../model/file-model");
const fileController = {};
fileController.create = async (req, res) => {
  try {
    const file = await File.create({
      file: req.file.filename,
      taskId: req.body.taskId,
    });
    return res.json(file);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

fileController.show = async (req, res) => {
  try {
    const files = await File.find({ taskId: req.params.id });
    return res.json(files);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: "something went wrong" });
  }
};
module.exports = fileController;
