import express from "express";

import { getUser, getUsers, updateUser, signin, signup } from "../controller/userController.js";

import auth from "../../middleware/auth.js";

const router = express.Router();

router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/update', auth, updateUser);

router.post('/signin', signin);
router.post('/signup', signup);

export default router;