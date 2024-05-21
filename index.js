const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();
const connectiondb = require("./config/database");
const { checkSchema } = require("express-validator");
const multer = require("multer");
const path = require("path");

const upload = require("./config/fileUpload");
const userController = require("./app/controller/userController");
const assigneeController = require("./app/controller/assigneeController");
const assignerController = require("./app/controller/assignerController");
const taskController = require("./app/controller/taskController");
const commentController = require("./app/controller/commentController");
const fileController = require("./app/controller/fileController");
const logController = require("./app/controller/logController");

const userRegisterValidationSchema = require("./app/validation/user-register-validation");
const userLoginValidationSchema = require("./app/validation/user-login-validation");
const commentValidationSchema = require("./app/validation/comment-validation");
const {
  assigneeValidation,
  assigneeEditValidation,
} = require("./app/validation/assignee-validation");
const {
  assignerValidation,
  assignerEditValidation,
} = require("./app/validation/assigner-validation");
const taskValidation = require("./app/validation/task-validation");
const authenticateUser = require("./app/middlewares/authenticateUser");
const authorizeUser = require("./app/middlewares/authorizeUser");
const Assignee = require("./app/model/assignee-model");
const port = process.env.PORT;

connectiondb();
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));

app.post(
  "/user/register",
  checkSchema(userRegisterValidationSchema),
  userController.register
);

app.post(
  "/user/login",
  checkSchema(userLoginValidationSchema),
  userController.login
);

app.get("/user/account", authenticateUser, userController.account);

// Assignee

app.get(
  "/user/assignee/profile",
  authenticateUser,
  authorizeUser(["Assignee"]),
  assigneeController.show
);
app.get(
  "/user/assignees",
  authenticateUser,
  authorizeUser(["Assigner"]),
  assigneeController.all
);
app.post(
  "/user/assignee/profile",
  authenticateUser,
  authorizeUser(["Assignee"]),
  checkSchema(assigneeValidation),
  assigneeController.create
);
app.put(
  "/user/assignee/profile",
  authenticateUser,
  authorizeUser(["Assignee"]),
  checkSchema(assigneeEditValidation),
  assigneeController.update
);

//Assigner

app.get(
  "/user/assigner/profile",
  authenticateUser,
  authorizeUser(["Assigner"]),
  assignerController.show
);
app.post(
  "/user/assigner/profile",
  authenticateUser,
  authorizeUser(["Assigner"]),
  checkSchema(assignerValidation),
  assignerController.create
);
app.put(
  "/user/assigner/profile",
  authenticateUser,
  authorizeUser(["Assigner"]),
  checkSchema(assignerEditValidation),
  assignerController.update
);

// task

app.post(
  "/assigner/task",
  authenticateUser,
  authorizeUser(["Assigner"]),
  checkSchema(taskValidation),
  taskController.create
);
app.get(
  "/assigner/task",
  authenticateUser,
  authorizeUser(["Assigner"]),
  taskController.show
);
app.get(
  "/assignee/task",
  authenticateUser,
  authorizeUser(["Assignee"]),
  taskController.show
);
app.get(
  "/task-details/:id",
  authenticateUser,
  authorizeUser(["Assignee", "Assigner"]),
  taskController.taskDetails
);

// comments
app.get(
  "/comment/:id",
  authenticateUser,
  authorizeUser(["Assignee", "Assigner"]),
  commentController.show
);
app.post(
  "/comment",
  authenticateUser,
  authorizeUser(["Assignee", "Assigner"]),
  checkSchema(commentValidationSchema),
  commentController.create
);

// files

app.get(
  "/file/:id",
  authenticateUser,
  authorizeUser(["Assignee", "Assigner"]),
  fileController.show
);
app.post("/file", upload.single("file"), fileController.create);

// logs

app.post(
  "/log/:id",
  authenticateUser,
  authorizeUser(["Assignee"]),
  logController.create
);
app.get(
  "/log/:id",
  authenticateUser,
  authorizeUser(["Assignee"]),
  logController.show
);
///

app.listen(port, () => {
  console.log("server running on port", port);
});
