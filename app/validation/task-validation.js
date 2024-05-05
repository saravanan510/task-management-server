const taskValidation = {
  title: {
    in: ["body"],
    exists: {
      errorMessage: "title is required",
    },
    notEmpty: {
      errorMessage: "title should not be empty",
    },
    trim: true,
  },
  description: {
    in: ["body"],
    exists: {
      errorMessage: "description is required",
    },
    notEmpty: {
      errorMessage: "description should not be empty",
    },
    trim: true,
  },
  status: {
    in: ["body"],
    exists: {
      errorMessage: "status is required",
    },
    notEmpty: {
      errorMessage: "status should not be empty",
    },
    isIn: {
      options: [["Pending", "In-Progress", "Completed"]],
      errorMessage: "status should be in one of three",
    },
    trim: true,
  },
  priority: {
    in: ["body"],
    exists: {
      errorMessage: "priority is required",
    },
    notEmpty: {
      errorMessage: "priority should not be empty",
    },
    isIn: {
      options: [["Low", "Medium", "High"]],
      errorMessage: "priority should be in one of three",
    },
    trim: true,
  },
  dueDate: {
    in: ["body"],
    exists: {
      errorMessage: "dueDate is required",
    },
    notEmpty: {
      errorMessage: "dueDate should not be empty",
    },
    trim: true,
    custom: {
      options: function (value) {
        if (new Date(value) < new Date()) {
          throw new Error("date should not be less than today date");
        } else {
          return true;
        }
      },
    },
  },
  assignedTo: {
    in: ["body"],
    exists: {
      errorMessage: "assignee is required",
    },
    notEmpty: {
      errorMessage: "assignee should not be empty",
    },
  },
};

module.exports = taskValidation;
