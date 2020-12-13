import { Router } from 'express'

// controller
import { createUser } from '../controllers/users.controller'

// middleware
import { authJWT, validatorJWT } from '../middlewares/index.middlewares'

const router = Router()

router.post('/', [ authJWT.verifyToken, authJWT.isAdmin, validatorJWT.checkRole, validatorJWT.checkDuplicateUsernameEmail ], createUser)

export default router;