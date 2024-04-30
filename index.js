const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectiondb = require("./config/database");
const { checkSchema } = require("express-validator");

const userController = require("./app/controller/userController");
const assigneeController = require("./app/controller/assigneeController");
const assignerController = require("./app/controller/assignerController");

const userRegisterValidationSchema = require("./app/validation/user-register-validation");
const userLoginValidationSchema = require("./app/validation/user-login-validation");
const {
  assigneeValidation,
  assigneeEditValidation,
} = require("./app/validation/assignee-validation");
const {
  assignerValidation,
  assignerEditValidation,
} = require("./app/validation/assigner-validation");
const authenticateUser = require("./app/middlewares/authenticateUser");
const authorizeUser = require("./app/middlewares/authorizeUser");
const port = process.env.PORT;

connectiondb();
app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  console.log("server running on port", port);
});
