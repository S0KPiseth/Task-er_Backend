
export const userValidatorSchema ={
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username should be between 3-20 characters",
    },
    matches: {
      // Regex: letters, numbers, underscore, dot — no leading/trailing/consecutive special chars
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
    exists: { errorMessage: 'Title is required' },
    isString: { errorMessage: 'Title must be a string' },
    trim: true,
  },
  description: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'Description must be a string' },
    trim: true,
  },
  'tags.*.tagname': {
    in: ['body'],
    exists: { errorMessage: 'Tag name is required' },
    isString: { errorMessage: 'Tag name must be a string' },
  },
  'tags.*.color': {
    in: ['body'],
    exists: { errorMessage: 'Tag color is required' },
    isString: { errorMessage: 'Color must be a string' },
  },
  'tags.*.textColor': {
    in: ['body'],
    exists: { errorMessage: 'Tag text color is required' },
    isString: { errorMessage: 'Text color must be a string' },
  },
  dueDate: {
    in: ['body'],
    exists: { errorMessage: 'Due date is required' },
    isISO8601: { errorMessage: 'Due date must be a valid date' },
    toDate: true,
  },
  priorityChoice: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'Priority choice must be a string' },
  },
  createdDate: {
    in: ['body'],
    exists: { errorMessage: 'Created date is required' },
    isISO8601: { errorMessage: 'Created date must be a valid date' },
    toDate: true,
  },
  userId: {
    in: ['body'],
    optional: true,
    isMongoId: { errorMessage: 'Invalid user ID' },
  },
  status:{
    in: ['body'],
    exists: { errorMessage: 'Status cannot be empty' },
  },
  idx:{
    optional:true
  }
};

