import { Profile } from "../models/profile.js"
import { Trivia } from "../models/trivia.js"

const create = async (req, res) => {
    try {
        req.body.owner = req.user.profile
        console.log("req.body ==> ",req.body)
        const trivia = await Trivia.create(req.body)
        const profile = await Profile.findByIdAndUpdate(
        req.user.profile,
        { $push: { trivia: trivia } },
        { new: true }
        )
        trivia.owner = profile
        res.status(201).json(trivia)
        console.log("TRIVIA", trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const index = async (req, res) => {
    try {
        const trivia = await Trivia.find({})
            .populate("owner")
            .sort({ createdAt: 'desc' })
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const show = async (req, res) => {
    try {
        const { triviaId } = req.params
        const trivia = await Trivia.findById(triviaId)
            .populate("owner")
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const { triviaId } = req.params
        const trivia = await Trivia.findByIdAndUpdate(triviaId, req.body, {
            new: true,
        }).populate("owner")
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {
    create,
    index,
    show,
    update,
}
