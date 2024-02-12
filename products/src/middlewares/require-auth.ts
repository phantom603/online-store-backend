import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
  }

  const response = await fetch(
    `${process.env.AUTH_SERVICE_URL}/api/auth/currentuser`,
    {
      method: "GET",
      // pass cookies which contain encoded JWT
      headers: { cookie: `${req.headers.cookie}` },
    }
  );
  const { currentUser } = await response.json();

  if (!currentUser) {
    throw new NotAuthorizedError("User is broken or something went wrong");
  }

  next();
};
