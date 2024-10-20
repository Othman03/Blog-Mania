import jwt from "jsonwebtoken";
import db from "../db/users.json" assert { type: "json" };
import { uuid } from "uuidv4";
/* import * as fs from 'node:fs/promises';
import path from 'node:path'; */
import { promises as fsPromises } from "fs";
import path from "path";
import { URL } from "url";

const dirname = new URL(".", import.meta.url).pathname;

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({
      status: 400,
      message: "Username and password fields cannot be empty",
    });

  const existingUser = db.users.find((user) => user.username === username);

  if (existingUser)
    return res.json({ status: 409, message: "username already exists" });
  const newUser = {
    id: uuid(),
    username: username,
    role: "client",
    password: password,
  };

  const users = [...db.users, newUser];

  await fsPromises.writeFile(
    path.join(dirname, "..", "db", "users.json"),
    JSON.stringify({ users: users })
  );

  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ status: 201, message: "User created successfully", accessToken });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = db.users.find((user) => user.username === username);

  if (!user) return res.sendStatus(401);

  const isPwdCorrect = password === user.password;

  if (isPwdCorrect) {
    const accessToken = jwt.sign(
      { username: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { username: "username" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      action: "login",
      accessToken,
      refreshToken,
    });
  }
};

export const logout = async (req, res) => {
  res.json({ action: "logout" });
};
