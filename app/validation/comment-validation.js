const commentValidation = {
  comment: {
    in: ["body"],
    exists: {
      errorMessage: "comment is required",
    },
    notEmpty: {
      errorMessage: "comment should not be empty",
    },
    trim: true,
  },
};

module.exports = commentValidation;
