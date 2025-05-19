import { Router } from "express";
import { savePublication, searchPublication, updatePublication, getPublications, deletePublication } from "./publication.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { publicationValidator } from "../middlewares/validator.js";

const router = Router();

router.get('/', getPublications)

router.post(
    "/",
    [
        publicationValidator,
        validarCampos
    ],
    savePublication
)

router.get(
    "/:id",
    [
        searchPublication
    ]
)

router.delete(
    '/:id',
    [
        deletePublication
    ]
)

router.put(
    "/:id",
    [
        publicationValidator,
        validarCampos
    ],
    updatePublication
)

export default router;