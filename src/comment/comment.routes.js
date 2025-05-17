import { Router } from "express";
import { saveComment, searchComment, updateComment, getComments, deleteComment } from "./comment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { commentsValidator } from "../middlewares/validator.js";

const router = Router();

router.get('/', getComments)

router.post(
    "/",
    [
        commentsValidator,
        validarCampos
    ],
    saveComment
)

router.get(
    "/:id",
    [
        commentsValidator,
        validarCampos
    ],
    searchComment
)

router.delete(
    '/:id',
    [
        commentsValidator,
        validarCampos
    ],
    deleteComment
)

router.put(
    "/:id",
    [
        commentsValidator,
        validarCampos
    ],
    updateComment
)

export default router;