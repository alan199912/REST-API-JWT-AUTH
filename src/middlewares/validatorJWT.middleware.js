import { ROLES } from '../models/Rol'
import User from '../models/User'

// validator

// check email or username exist
export const checkDuplicateUsernameEmail = async (req, res, next) => {

    try {
        // if username exists
        const username = await User.findOne({ username: req.body.username })

        if(username){
            return res.status(400).json({
                status: 400,
                message: `Username '${req.body.username}' already exists`
            })
        }

        // if email exists
        const email = await User.findOne({ email: req.body.email })

        if(email){
            return res.status(400).json({
                status: 400,
                message: `Email '${req.body.email}' already exists`
            })
        }

        next()

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Error',
        })

    }
    
}


// check role
export const checkRole = (req, res, next) => {

    try {
        if(req.body.role) {
            req.body.role.filter( rol => {
                console.log(rol) 
                if(!ROLES.includes(rol)) {
                    return res.status(400).json({
                        status: 400,
                        message: `Role '${req.body.role}' does not exists`
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).json({
                status: 500,
                message: 'Internal Error',
                error: error.message
            })
    }

}