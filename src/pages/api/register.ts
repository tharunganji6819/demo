import Db from "../../db";
import User from "../../models";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

Db();

type Details = {
  username: string;
  email: string;
  password: string;
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, email, password }: Details = req.body;
    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(400).json({ message: "User Already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ newUser });
  }
}
