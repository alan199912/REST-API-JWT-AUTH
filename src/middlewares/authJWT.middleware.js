import jwt from "jsonwebtoken"
import config from '../config/config'
import User from '../models/User'
import Role from '../models/Rol'

// if user send the token
export const verifyToken = async (req, res, next) => {

    try {
        // received token
        const token = req.headers["access-token"]

        // console.log(token)

        // if token not exist
        if(!token) {
            res.status(403)
            res.json({
                status: 403,
                message: 'No Token Provided'
            })
        }

        // verify token
        const decoded = jwt.verify(token, config.SECRET)
        req.id = decoded.id
        // console.log(decoded)

        // if user exist
        const user = await User.findById(req.id, { password: 0 })
        // console.log(user)

        // if not foun user
        if(!user) {
            res.status(404)
            res.json({
                status: 404,
                message: 'User not found'
            })
        }
        next()
    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'Unathorized'
        })
    }
}

export const isModerator = async (req, res, next) => {

    try {
        const user = await User.findById(req.id)
        const roles = await Role.find({_id: {$in: user.role}})

        roles.filter( rol => {
            if(rol.name === 'moderator') {
                res.json({
                    status: 200,
                    message: 'Obtain permission',
                    role: roles
                })
                next()
                return
            }
        })

        res.status(403)
        res.json({
            status: 403,
            message: 'Does not have permission'
        })

    } catch (error) {

        res.status(500)
        res.json({
            status: 500,
            message: 'Internal Error'
        })
    }

}

export const isAdmin = async (req, res, next) => {

    try {
        const user = await User.findById(req.id)
        const roles = await Role.find({_id: {$in: user.role}})

        roles.filter( rol => {
            if(rol.name === 'admin') {
                res.json(next())
                return
            }
        })

        res.status(403)
        res.json({
            status: 403,
            message: 'Does not have permission'
        })

    } catch (error) {

        res.status(500)
        res.json({
            status: 500,
            message: 'Internal Error'
        })
    }

}

