import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Password } from "../../services/password";
import { validateRequest } from "common";
import { BadRequestError } from "common";
import db from "../../services/db.service";
import User from "../../types/user";

const router = express.Router();

router.post(
  "/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const connection = await db.connect();
    const users: User[] = connection.get("users");

    const existingUser = users.find((u) => u.email === email);
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
