// Validator function
const validator = require("validator");

const validateSignup = (req, res) => {
  const { email, password, photoUrl } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send({ message: "Invalid email address" });
  }

  if (!password || !validator.isStrongPassword(password)) {
    return res
      .status(400)
      .send({ message: "Invalid password - must be strong" });
  }

  if (!photoUrl || !validator.isURL(photoUrl)) {
    return res.status(400).send({ message: "Invalid photo URL" });
  }

  return true;
};

const validateLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  if (!password || !validator.isStrongPassword(password)) {
    return res
      .status(400)
      .send({ message: "Invalid credentials" });
  }

  return true;
};

module.exports = {
  validateSignup,
  validateLogin
                  };