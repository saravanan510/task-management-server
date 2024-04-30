const User = require("../model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const userController = {};

userController.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(req.body.password, salt);
    const body = User(req.body);
    body.password = hashPassword;
    const user = await User.create(body);
    res.status(201).send(user);
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

userController.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isAuth = await bcryptjs.compare(req.body.password, user.password);
      if (isAuth) {
        const tokendata = {
          userId: user._id,
          role: user.role,
        };
        const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });
        res.json({ token: token });
      } else {
        res.status(400).json({ errors: "invalid email/password" });
      }
    } else {
      res.status(400).json({ errors: "invalid email/password" });
    }
  } catch (err) {
    res.status(500).json({ errors: "something went wrong" });
  }
};

userController.account = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = userController;
