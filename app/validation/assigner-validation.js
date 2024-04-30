const Assigner = require("../model/assigner-model");

const assignerValidation = {
  userId: {
    custom: {
      options: async function (value, { req }) {
        const assigner = await Assigner.findOne({ userId: req.user.id });
        if (assigner) {
          throw new Error("profile is already created");
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
        const user = await Assigner.findOne({ mobile: value });
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

const assignerEditValidation = {
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

module.exports = { assignerValidation, assignerEditValidation };
