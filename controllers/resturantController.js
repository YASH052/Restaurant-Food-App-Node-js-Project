const resturantModel = require("../models/resturantModel")

const createResturantController = async (req, res) => {
    try {
        const { title, iamgeUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body

        //validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Please enter details"
            })
        }
        const newResturant = await resturantModel({ title, iamgeUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords })
        await newResturant.save()

        res.status(200).send({
            success: true,
            message: "new resturant created Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in create resturant api',
            error
        })
    }
}
//GET ALL resturant
const getAllResturantsController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({})
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: 'no resturant avialable'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in get all resturants',
            error
        })
    }
}

//get resturant by id

const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: 'please provide resturant ID',
            })
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "no resturant found"
            })
        }
        res.status(200).send({
            success: true,
            resturant,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in get all resturants by id',
            error
        })
    }
}

// delete resturant
const deleteResturantContoller = async (req, res) => {
    try {

        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "no resturant found provide resturant id"
            })
        }
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "no resturant found please provide resturant id"
            })
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success: true,
            message: 'resturant deleted successfully'
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in delete resturant",
            error
        })
    }
}

module.exports = {
    createResturantController,
    getAllResturantsController,
    getResturantByIdController,
    deleteResturantContoller
}