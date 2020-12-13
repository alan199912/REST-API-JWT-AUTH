import { Router } from 'express'

// controllers
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/products.controller'

// middlewares
import { authJWT } from '../middlewares/index.middlewares'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', [authJWT.verifyToken, authJWT.isModerator], createProduct)
router.put('/:id', [authJWT.verifyToken, authJWT.isAdmin], updateProduct)
router.delete('/:id', [authJWT.verifyToken, authJWT.isAdmin], deleteProduct)


export default router
