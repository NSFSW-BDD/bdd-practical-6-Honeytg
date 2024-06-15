require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

const jwtMiddleware = {
  // Middleware function for generating JWT token
  generateToken: (req, res, next) => {
    const payload = {
      userid: res.locals.userid,
      role: res.locals.role,
      timestamp: new Date()
    };

    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };

    // Generate a JWT token with the provided payload and options
    const token = jwt.sign(payload, secretKey, options);

    // Store the generated token in res.locals for later use
    res.locals.token = token;
    next();
  },

  // Middleware function for sending JWT token as a response
  sendToken: (req, res, next) => {
    res.status(200).json({
      message: "Token generated successfully",
      token: res.locals.token,
    });
  },

  // Middleware function for verifying JWT token
  verifyToken: (req, res, next) => {
    // Get the token from the request headers
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Token is valid, store the decoded information in res.locals for later use
      res.locals.userid = decoded.userid;
      res.locals.role = decoded.role;
      res.locals.tokenTimestamp = decoded.timestamp;
      next();
    });
  },

  verifyAdmin: (req, res, next) => {
    if (res.locals.role == "admin") {
      next();
    }else{
      return res.status(401).json({ error: "Invalid Access Role" });
    }
  }
};

module.exports = jwtMiddleware;
