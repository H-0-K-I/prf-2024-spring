import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { createUser } from "../../../db/src/queries/create-user";
import { getUser } from "../../../db/src/queries/get-user";

export const createUserService = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const hashPassword = await hash(user.password, 10);

    const hashPasswordUser = {
      ...user,
      password: hashPassword,
    };

    await createUser(hashPasswordUser);
    res.send({});
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUserService = async (req: Request, res: Response) => {
  try {
    const requestedUser = req.body;

    const dbUser = await getUser(requestedUser.username);

    if (
      dbUser !== null &&
      (await compare(requestedUser.password, dbUser.password))
    ) {
      res.json({
        userId: dbUser._id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        username: dbUser.username,
        isAdmin: dbUser.isAdmin,
      });
    } else {
      res.status(400).send("ERROR: Users don't match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
