import express from "express";

import { getUsers, updateUser, signin, signup } from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getUsers);
router.patch('/update', auth, updateUser);

router.post('/signin', signin);
router.post('/signup', signup);

export default router;