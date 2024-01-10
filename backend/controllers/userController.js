import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { User } from "../models/userModel.js"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ message: 'Add all field' })
        }

        const userExist = await User.findOne({email})

        if (userExist) {
            res.status(400).send({ message: 'user lready registered' })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
            res.status(400).send({ message: 'Failed to create user'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email})

        if (user && ( await bcrypt.compare(password, user.password))){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
            res.status(400).send({ message: 'Invalid credentials'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

export const getMe = async (req, res) => {
    try {
        const { _id, name, email} = await User.findById(req.user.id)

        res.status(200).json({
            id: _id,
            name,
            email
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}