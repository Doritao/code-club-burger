import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/models/SessionController";
import ProductController from "./app/controllers/ProductController";


const routes = new Router();
routes.post("/users", UserController.store);

routes.post("/sessions", SessionController.store);

routes.post("/products", ProductController.store);


export default routes;
