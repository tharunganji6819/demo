import Db from "../../db";
import User from "../../models";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

type Payload = {
  username: string;
};

Db();
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    console.log(findUser);
    if (findUser) {
      const payload: Payload = {
        username,
      };
      console.log(payload);
      const samePassword = await bcryptjs.compare(password, findUser.password);
      console.log(samePassword);
      if (!samePassword) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      const token = jwt.sign(payload, "demo");
      return res.status(200).json({ token });
    }
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(400).json({ message: "Method not allowed" });
}
