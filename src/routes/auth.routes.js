import { Router } from 'express'

const router = Router()

// controllers
import { signIn, signUp } from '../controllers/auth.controller'

// middleware
import { validatorJWT } from '../middlewares/index.middlewares'

router.post('/signup', [validatorJWT.checkDuplicateUsernameEmail, validatorJWT.checkRole], signUp)
router.post('/signin', signIn)

export default router;