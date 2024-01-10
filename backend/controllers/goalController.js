import { Goal } from "../models/goalModel.js";
import { User } from "../models/userModel.js";

export const getGoals = async (req, res) => {
    try{
        const goals = await Goal.find({user: req.user.id})
        res.status(200).json(goals)
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
}

export const setGoal = async (req, res) => {
    try{
        if (!req.body.text) {
            res.status(400).json({ message: 'no text' })
        }
        
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.status(200).json(goal)
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
}

export const updateGoal = async (req, res) => {
    try{
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            return res.status(400).send({message: 'gaol not found'})
        }

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401).send({message: 'user not found'})
        }

        if( goal.user.toString() !== user.id){
            res.status(401).send({message: "user not authorized"})
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedGoal)
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
   
}

export const deleteGoal = async (req, res) => {
    try{

        const goal = await Goal.findById(req.params.id)
        if(!goal){
            res.status(404).send({message: "goal not found"})
        }

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401).send({message: 'user not found'})
        }

        if( goal.user.toString() !== user.id){
            res.status(401).send({message: "user not authorized"})
        }

        const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: `Deleted ${goal.text}` })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
   
}
