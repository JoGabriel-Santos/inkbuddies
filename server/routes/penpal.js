import { createPenpal, fetchPenpals } from "../controllers/penpal.js";

import router from "./user.js";

router.get('/:id', fetchPenpals);
router.post('/new', createPenpal);

export default router;