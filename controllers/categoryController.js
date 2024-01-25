// create cat
const categoryModel = require("../models/categoryModel")

const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Please enter a category title or image'
            })
        }
        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save()
        res.status(201).send({
            success: true,
            message: 'Your category has been created',
            newCategory
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in create CATEGORY API',
            error
        })
    }
}

//get All

const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: 'categories not found'
            })
        }
        res.status(200).send({
            success: true,
            total: categories.length,
            categories,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getAllCatController API',
            error
        })
    }
}

const updateCatController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        )
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: 'no category found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'category updated successfully'
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in updateCatController API',
            error
        })
    }
}

const deleteCatController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(500).send({
                success: "fasle",
                message: 'please provide an id'
            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: 'No Category with the id '
            })
        }
        await categoryModel.findOneAndDelete(id)
        res.status(200).send({
            success: true,
            message: `Category with the id ${id} deleted successfully`
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in deleteCatController API',
            error
        })
    }
}



module.exports = {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController
}