const Assignee = require("../model/assignee-model");

const assigneeValidation = {
  userId: {
    custom: {
      options: async function (value, { req }) {
        console.log(req.user);
        const user = await Assignee.findOne({ userId: req.user.id });
        if (user) {
          throw new Error("Profile is already created");
        } else {
          return true;
        }
      },
    },
  },
  firstname: {
    in: ["body"],
    exists: {
      errorMessage: "firstname is required",
    },
    notEmpty: {
      errorMessage: "firstname should not be Empty",
    },
    trim: true,
  },
  lastname: {
    in: ["body"],
    exists: {
      errorMessage: "lastname is required",
    },
    notEmpty: {
      errorMessage: "lastname should not be Empty",
    },
    trim: true,
  },
  mobile: {
    in: ["body"],
    exists: {
      errorMessage: "mobile number is required",
    },
    notEmpty: {
      errorMessage: "mobile number should not be Empty",
    },
    isLength: {
      options: {
        min: 10,
        max: 10,
      },
      errorMessage: "mobile number should be 10 digit",
    },
    isNumeric: {
      errorMessage: "mobile number should be numeric",
    },
    trim: true,
    custom: {
      options: async function (value) {
        const user = await Assignee.findOne({ mobile: value });
        if (user) {
          throw new Error("mobile number is already exists");
        } else {
          return true;
        }
      },
    },
  },
  address: {
    in: ["body"],
    exists: {
      errorMessage: "address is required",
    },
    notEmpty: {
      errorMessage: "address should not be empty",
    },
    trim: true,
  },
};

const assigneeEditValidation = {
  firstname: {
    in: ["body"],
    exists: {
      errorMessage: "firstname is required",
    },
    notEmpty: {
      errorMessage: "firstname should not be Empty",
    },
    trim: true,
  },
  lastname: {
    in: ["body"],
    exists: {
      errorMessage: "lastname is required",
    },
    notEmpty: {
      errorMessage: "lastname should not be Empty",
    },
    trim: true,
  },
  mobile: {
    in: ["body"],
    exists: {
      errorMessage: "mobile number is required",
    },
    notEmpty: {
      errorMessage: "mobile number should not be Empty",
    },
    isLength: {
      options: {
        min: 10,
        max: 10,
      },
      errorMessage: "mobile number should be 10 digit",
    },
    isNumeric: {
      errorMessage: "mobile number should be numeric",
    },
    trim: true,
  },
  address: {
    in: ["body"],
    exists: {
      errorMessage: "address is required",
    },
    notEmpty: {
      errorMessage: "address should not be empty",
    },
    trim: true,
  },
};

module.exports = { assigneeValidation, assigneeEditValidation };
