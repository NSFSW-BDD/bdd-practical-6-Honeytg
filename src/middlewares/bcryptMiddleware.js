const bcrypt = require("bcrypt");

const saltRounds = 10;

const bcryptMiddleware = {
  // Middleware function for comparing passwords
  comparePassword: (req, res, next) => {
      // Check if res.locals.hash contains hashed password
      if (!res.locals.hash) {
        return res.status(500).json({ error: "Hashed password is missing" });
      }

    // Compare password
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
     // Check if request body contains password
     if (!req.body.password) {
        return res.status(400).json({ error: "Password is required" });
      }
      
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
