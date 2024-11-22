import Db from "../../db";
import User from "../../models";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type Payload = {
  username: string;
};

Db();
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username } = req.body;
    const findUser = await User.findOne({ username });
    if (findUser) {
      const payload: Payload = {
        username,
      };
      const token = jwt.sign(payload, "demo");
      return res.status(200).json({ token });
    }
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(400).json({ message: "Method not allowed" });
}
