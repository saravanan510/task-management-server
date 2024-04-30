const userLoginValidationSchema = {
  email: {
    in: ["body"],
    exists: {
      errorMessage: "email is required",
    },
    notEmpty: {
      errorMessage: "email should not be empty",
    },
    isEmail: {
      errorMessage: "email should be valid format",
    },
    normalizeEmail: true,
    trim: true,
  },
  password: {
    in: ["body"],
    exists: {
      errorMessage: "password is required",
    },
    notEmpty: {
      errorMessage: "password should not be empty",
    },
    isLength: {
      options: { min: 8, max: 128 },
      errorMessage: "password length should be 8 - 128 character length",
    },
  },
};

module.exports = userLoginValidationSchema;
