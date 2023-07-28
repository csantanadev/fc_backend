import express, { Request, Response } from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (request: Request, response: Response) => {
  return response.json({ message: "ping" });
});

export { app };
