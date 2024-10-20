import { Router } from "express";
import db from "../db/blogs.json" assert { type: "json" };
import { uuid } from "uuidv4";
import { promises as fsPromises } from "fs";
import path from "path";
import { URL } from "url";

const dirname = new URL(".", import.meta.url).pathname;

export default function (app) {
  const route = Router();

  app.use("/blogs", route);

  route.get("/", async (req, res) => {
    const username = req.user;
    console.log(username);
    const blogs = db.blogs.filter((blog) => blog.author === username);
    res.json({ blogs });
  });

  route.post("/", async (req, res) => {
    const username = req.user;
    console.log(req.body);
    const blogs = db.blogs;
    const postedBlog = {
      title: req.body.title,
      body: req.body.body,
      author: username,
      id: uuid(),
    };
    const newBlogs = [...blogs, postedBlog];

    await fsPromises.writeFile(
      path.join(dirname, "..", "db", "blogs.json"),
      JSON.stringify({ blogs: newBlogs }, null, 2)
    );
    res.json({ postedBlog });
  });

  route.get("/:id", async (req, res) => {
    const id = req.params.id;

    const blog = db.blogs.find((blog) => String(blog.id) === String(id));

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  });

  route.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body);

    const otherBlogs = db.blogs.filter((blog) => blog.id != id);

    const updatedBlog = {
      title: body.title,
      body: body.body,
      author: req.user,
      id: id,
    };

    const newBlogs = [...otherBlogs, updatedBlog];

    await fsPromises.writeFile(
      path.join(dirname, "..", "db", "blogs.json"),
      JSON.stringify({ blogs: newBlogs }, null, 2)
    );

    res.json({
      id,
      method: req.method,
      message: `Blog with id ${id} has been updated :)`,
    });
  });

  route.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const otherBlogs = db.blogs.filter((blog) => String(blog.id) != String(id));

    await fsPromises.writeFile(
      path.join(dirname, "..", "db", "blogs.json"),
      JSON.stringify({ blogs: otherBlogs }, null, 2)
    );

    res.json({
      id,
      method: req.method,
      message: `Blog with id ${id} has been deleted :)`,
    });
  });
}
