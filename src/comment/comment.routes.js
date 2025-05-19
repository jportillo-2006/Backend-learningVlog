import { Router } from "express";
import { saveComment, searchComment, updateComment, getComments, deleteComment, getCommentsByPublication } from "./comment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { commentsValidator } from "../middlewares/validator.js";

const router = Router();

router.get('/', getComments)
router.get('/publication/:publicationId', getCommentsByPublication);

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
        searchComment
    ]
)

router.delete(
    '/:id',
    [
        deleteComment
    ]
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