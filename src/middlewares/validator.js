import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const commentsValidator = [
    body("name", "The name is required and cannot exceed 12 characters").not().isEmpty().isLength({max: 12}),
    body("content", "The content is required and cannot exceed 75 characters").not().isEmpty().isLength({max: 75}),
    validarCampos
];

export const publicationValidator = [
    body("title", "The title is required and cannot exceed 50 characters").notEmpty().isLength({ max: 50 }),
    body("content", "The content is required and cannot exceed 500 characters").notEmpty().isLength({ max: 500 }),
    body("course").optional().isIn(["Tecnologia", "Taller", "Practica supervisada"]).withMessage("Course must be one of: Tecnologia, Taller, Practica supervisada"),
    validarCampos
];