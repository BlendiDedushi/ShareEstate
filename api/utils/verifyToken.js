import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";


export const invalidatedTokens = []; 

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "You are not authenticated!"));
  }

  if (invalidatedTokens.includes(token)) {
    return next(createError(401, "Token is no longer valid!"));
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (err, decodedToken) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = decodedToken;
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAgent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'agent') {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};