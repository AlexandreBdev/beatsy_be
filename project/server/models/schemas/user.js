module.exports = {
    firstName: String,
    surname: String,
    password: String,
    email: String,
    username: String,
    token: String,
    thumbnail: String,
    created: {
      type: Date,
      default: Date.now
    }
  };
  