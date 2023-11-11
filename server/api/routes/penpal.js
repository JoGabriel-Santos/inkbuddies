import { createPenpal, fetchPenpals, sendLetter } from "../controller/penpalController.js";

import router from "./user.js";

router.get('/fetch/:id', fetchPenpals);
router.post('/new', createPenpal);
router.patch('/letter', sendLetter);

export default router;