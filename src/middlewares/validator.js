import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const commentsValidator = [
    body("name", "The name is required and cannot exceed 12 characters").not().isEmpty().isLength({max: 12}),
    body("content", "The content is required and cannot exceed 75 characters").not().isEmpty().isLength({max: 75}),
    validarCampos
];