const bcrypt = require("bcrypt");

const saltRounds = 10;

const bcryptMiddleware = {
  // Middleware function for comparing passwords
  comparePassword: (req, res, next) => {
    // Check password
    bcrypt.compare(req.body.password, res.locals.hash, (err, isMatch) => {
      if (err) {
        console.error("Error bcrypt:", err);
        return res.status(500).json(err);
      }
      if (isMatch) {
        next(); // Passwords match, proceed to next middleware or route handler
      } else {
        res.status(401).json({
          message: "Wrong password",
        });
      }
    });
  },

  // Middleware function for hashing passwords
  hashPassword: (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error bcrypt:", err);
        return res.status(500).json(err);
      }
      // Store the hashed password in res.locals for later use
      res.locals.hash = hash;
      next();
    });
  }
};

module.exports = bcryptMiddleware;
