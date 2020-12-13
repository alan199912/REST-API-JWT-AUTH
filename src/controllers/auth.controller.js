import User from '../models/User'
import Role from '../models/Rol'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export const signUp = async (req, res) => {
    
    try {

        const { username, email, password, role } = req.body

        // register user
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        })

        // adding the role
        if(role) {
            const foundRole = await Role.find({ name: {$in: role } })
            newUser.role = foundRole.map( role => role._id )
        } else {
            const roleFound = await Role.findOne({ name: 'user' })
            newUser.role = [roleFound._id]
        }

        // save user
        const savedUser = await newUser.save()
        console.log(savedUser)

        // create a token
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400 // 24h
        })
        
        // message
        res.status(200)
        res.json({
            status: 200,
            message: 'Sign up Successfully',
            token: token
        })

    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'Sign up Failed',
            error: error.message
        })
    }

}

export const signIn = async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email }).populate("role");
        // 'populate' says that you want to return the established fields
        
        // if user not exist
        if(!user) {
            res.status(400)
            res.json({
                status: 400,
                message: 'User not found'
            })
        } 

        // compare password
        const matchPass = await User.comparePassword(req.body.password, user.password)

        if(!matchPass){
            res.status(401)
            res.json({
                status: 401,
                message: 'Invalid Password'
            })
        }

        // generate token
        const token = jwt.sign({ id: user._id}, config.SECRET, {
            expiresIn: 86400 // 24h
        })

        // message
        res.status(200)
        res.json({
            status: 200,
            message: 'Sign in Successfully',
            token: token
        })
        
        console.log(user)

    } catch (error) {
        res.status(500)
        res.json({
            status: 500,
            message: 'Sign in Failed',
            error: error.message
        })
    }
}