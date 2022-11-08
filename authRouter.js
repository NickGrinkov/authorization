import Router from "express";
import controller from "./authController.js";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { roleMiddleware } from "./middleware/roleMiddleware.js";

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть более 4 и менее 16 символов")
      .notEmpty()
      .isLength({ min: 5, max: 15 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(['ADMIN']), controller.getUsers);

export default router;
