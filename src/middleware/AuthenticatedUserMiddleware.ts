import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

class AuthenticatedUserMiddleware {
  ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json({
        message: "Token is missiong",
      });
    }

    const [, token] = authToken.split(" ");
    try{
        verify(token, "79123427-290f-4c63-aca3-120ea5364159");
    }catch (error) {
        return response.status(401).json({
            message: "Invalid token"
        });
    }

  }
}

export default AuthenticatedUserMiddleware;
