import { Router } from 'express';

import { validate } from '#/middleware/validator';
import { CreateUserSchema } from '#/utils/validationSchema';
import { createUser } from '#/controllers/user';

const router = Router();

router.post('/create', validate(CreateUserSchema), createUser);

export default router;
