import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

class AuthenticatedAdminMiddleware {
  ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log("entrou");
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json({
        message: "Token is missiong",
      });
    }

    const [, token] = authToken.split(" ");
    try {
      verify(token, "7fb90d91-c44f-4123-b424-3f1852ba4687");

      return next();
    } catch (error) {
      return response.status(401).json({
        message: "Invalid token",
      });
    }
  }
}

export default AuthenticatedAdminMiddleware;
