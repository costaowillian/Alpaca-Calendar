import express from "express";
import { MongoGetUserRepository } from "../models/Get-all-users-repository";
import { GetUserController } from "../controllers/user/Get-all-user";
import { MongoGetOneUserRepository } from "../models/Get-user-repository";
import { GetOneUserController } from "../controllers/user/Get-user";
import { checkToken } from "../middleware/checkToken";

const router = express.Router();

// Rota para obter todos os usuários
router.get("/users/get-all", checkToken, async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();
  const getUserController = new GetUserController(mongoGetUserRepository);

  const { body, statusCode } = await getUserController.handle();
  res.status(statusCode).send(body);
});

// Rota para obter um usuário por ID
router.get("/users/get-user/:id", checkToken, async (req, res) => {
  const mongoGetOneUserRepository = new MongoGetOneUserRepository();
  const getOneUserController = new GetOneUserController(
    mongoGetOneUserRepository
  );

  const { body, statusCode } = await getOneUserController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

export default router;
