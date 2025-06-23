
export const userValidatorSchema ={
  fname: {
    notEmpty: {
      errorMessage: "First name cannot be empty",
    },
    isLength: {
      options: { min: 2, max: 30 },
      errorMessage: "First name should be between 2 to 30 characters",
    },
    matches: {
      options: [/^[A-Za-z]+$/],
      errorMessage: "First name can only contain alphabetic characters",
    },
  },

lname: {
    notEmpty: {
      errorMessage: "Last name cannot be empty",
    },
    isLength: {
      options: { min: 2, max: 30 },
      errorMessage: "Last name should be between 2 to 30 characters",
    },
    matches: {
      options: [/^[A-Za-z]+$/],
      errorMessage: "Last name can only contain alphabetic characters",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username should be between 3-20 characters",
    },
    matches: {

      options: [/^(?![_\.])(?!.*[_\.]{2})[a-zA-Z0-9._]+(?<![_\.])$/],
      errorMessage:
        "Username can only contain letters, numbers, underscores, and dots. No leading, trailing, or consecutive special characters.",
    },
  },

  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
    normalizeEmail: true, // optional: auto trims and lowercases email
  },

  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    matches: {
      // At least one uppercase, one lowercase, one number, one special character
      options: [/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}/],
      errorMessage:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  }
}


export const validateTask = {
  title: {
    in: ['body'],
    exists: {
      errorMessage: 'Title is required',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
    notEmpty: {
      errorMessage: 'Title cannot be empty',
    },
  },

  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
  },

  tags: {
    in: ['body'],
    optional: true,
    isArray: {
      errorMessage: 'Tags must be an array',
    },
  },

  'tags.*.tagname': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Tagname must be a string',
    },
  },

  'tags.*.color': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Color must be a string',
    },
  },

  'tags.*.textColor': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'TextColor must be a string',
    },
  },

  dueDate: {
  
    optional: { options: { nullable: true } },
    isISO8601: {
      errorMessage: 'Due date must be a valid ISO 8601 date',
    },
  },

  completedDate: {
   
    optional: { options: { nullable: true } },
    isISO8601: {
      errorMessage: 'Completed date must be a valid ISO 8601 date',
    },
  },

  priorityChoice: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Priority choice must be a string',
    },
  },

  createdDate: {
    in: ['body'],
    exists: {
      errorMessage: 'Created date is required',
    },
    isISO8601: {
      errorMessage: 'Created date must be a valid ISO 8601 date',
    },
  },

  userId: {

    optional: true,
    isMongoId: {
      errorMessage: 'User ID must be a valid Mongo ID',
    },
  },

  boardId: {
    optional: true,
    isMongoId: {
      errorMessage: 'Board ID must be a valid Mongo ID',
    },
  },

  status: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Status must be a string',
    },
  },

  boardName: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Board name must be a string',
    },
  },
  idx:{
    optional:true
  }
}
  


