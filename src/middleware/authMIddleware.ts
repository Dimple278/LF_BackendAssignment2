import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import ApiError from "../error/apiError";
import { getUserById } from "../model/userModel";

const { secretKey } = config;

if (!secretKey) {
  throw new Error("Secret key is not defined");
}

export interface AuthRequest extends Request {
  user?: JwtPayload & { id: number; email: string };
}

const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return next(new ApiError(403, "Forbidden: Invalid token"));
      }

      req.user = user as JwtPayload & { id: number; email: string };
      next();
    });
  } else {
    next(new ApiError(401, "Unauthorized: No token provided"));
  }
};

const authorizeSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const user = getUserById(req.user.id);

  if (user.role !== "superadmin") {
    return next(new ApiError(403, "Forbidden"));
  }

  next();
};

export { authenticateJWT, authorizeSuperAdmin };
