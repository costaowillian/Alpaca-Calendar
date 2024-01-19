import { GetEventsController } from "./../controllers/events/Get-all-events";
import { MongoGetEventsrepository } from "./../models/Events/Get-all-events-repository";
import express from "express";
import { MongoGetUserRepository } from "../models/user/Get-all-users-repository";
import { GetUserController } from "../controllers/user/Get-all-user";
import { MongoGetOneUserRepository } from "../models/user/Get-user-repository";
import { GetOneUserController } from "../controllers/user/Get-user";
import { checkToken } from "../middleware/checkToken";
import { MongoCreateUserReporitory } from "../models/user/Create-user-repository";
import { CreateUserController } from "../controllers/user/Create-user";
import { MongoGetUserAuthRepository } from "../models/user/Auth-user-repository";
import { LoginUserController } from "../controllers/auth/Auth-user";
import { MongoGetEventRepository } from "../models/Events/Get-event-repository";
import { GetEventController } from "../controllers/events/Get-event";
import { MongoUpdateEventRepository } from "../models/Events/Update-event-repository";
import { UpdateEventController } from "../controllers/events/Update-event";
import { CreateEventController } from "../controllers/events/Create-event";
import { MongoGetEventByDateRepository } from "../models/Events/Get-event-by-date";
import { MongoDeleteEventRepository } from "../models/Events/Delete-event-repository";
import { DeleteEventController } from "../controllers/events/Delete-event";
import { MongoCreateEventRepository } from "../models/Events/Create-Event_repository";

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

// Rota para criar um usuário
router.post("/users/create-user", async (req, res) => {
  const mongoGetUserAuthRepository = new MongoGetUserAuthRepository();
  const mongoCreateUserRepository = new MongoCreateUserReporitory();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository,
    mongoGetUserAuthRepository
  );
  const { body, statusCode } = await createUserController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

//Rota para autenticar um usuário
router.post("/users/auth", async (req, res) => {
  const mongoGetUserAuthRepository = new MongoGetUserAuthRepository();
  const logiUserController = new LoginUserController(
    mongoGetUserAuthRepository
  );
  const { body, statusCode } = await logiUserController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

//Rota para pegar todos os eventos com base no id do usuário
router.get("/events/get/:userId", checkToken, async (req, res) => {
  const mongoGetEventsrepository = new MongoGetEventsrepository();
  const getEventsController = new GetEventsController(mongoGetEventsrepository);
  const { body, statusCode } = await getEventsController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

//Rota para pegar um evento com base no id
router.get("/events/get/:id", checkToken, async (req, res) => {
  const mongoGetEventRepository = new MongoGetEventRepository();
  const getEventController = new GetEventController(mongoGetEventRepository);
  const { body, statusCode } = await getEventController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

//Rota para atualizar um evento com base no id
router.put("/events/update", checkToken, async (req, res) => {
  const mongoUpdateEventRepository = new MongoUpdateEventRepository();
  const updateEventController = new UpdateEventController(
    mongoUpdateEventRepository
  );
  const { body, statusCode } = await updateEventController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

//Rota para criar um evento.
router.post("/events/create", checkToken, async (req, res) => {
  const mongoGetEventByDateRepository = new MongoGetEventByDateRepository();
  const mongoCreateEventRepository = new MongoCreateEventRepository();
  const createEventController = new CreateEventController(
    mongoCreateEventRepository,
    mongoGetEventByDateRepository
  );
  const { body, statusCode } = await createEventController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

//Rota para deletar um evento.
router.delete("/events/delete/:id", checkToken, async (req, res) => {
  const mongoDeleteEventRepository = new MongoDeleteEventRepository();
  const deleteEventController = new DeleteEventController(
    mongoDeleteEventRepository
  );
  const { body, statusCode } = await deleteEventController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

export default router;
