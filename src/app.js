import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import bodyParser from 'body-parser'

// routes
import authRoute from './routes/auth.routes'
import productsRoute from './routes/products.routes'
import userRoute from './routes/user.routes'

// libs
import { createRoles } from './libs/initialSetups'

const app = express()
createRoles()

// save on express variable
app.set('pkg', pkg)

app.use(morgan('dev'))
app.use(bodyParser.json()) 

// endpoints
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
app.use('/api/products', productsRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

export default app