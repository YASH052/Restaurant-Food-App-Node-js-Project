const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
// create food

const createFoodController = async (req, res) => {
    try {
        const { title,
            description,
            price,
            imagUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating } = req.body;

        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: 'Missing fields'
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imagUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        })
        await newFood.save();
        res.status(201).send({
            success: true,
            message: 'newFood saved successfully',
            newFood,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: 'false',
            message: "error in create food controller API",
            error,
        });
    }
}

// get food items

const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "no food items founds"
            })
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in getting foods",
            error,
        })
    }
}

//get single food

const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            res.status(404).send({
                success: false,
                message: "please provide id"
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                succes: false,
                message: "no food found or food id is wrong",
            })
        }
        res.status(200).send({
            success: true,
            food,
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: "error in getting single food",
            error,
        })
    }
}

//getby resturant
const getByResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            res.status(404).send({
                success: false,
                message: "please provide id"
            })
        }
        const food = await foodModel.find({ resturant: resturantId })
        if (!food) {
            return res.status(404).send({
                succes: false,
                message: "no food found or food id is wrong",
            })
        }
        res.status(200).send({
            success: true,
            message: "food based on resturant",
            food,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getting getbyresturant',
            error
        })
    }
}

//updatefood
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "no food is was found"
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "no food found"
            })
        }
        const { title,
            description,
            price,
            imagUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imagUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        }, { new: true })
        res.status(202).send({
            succes: true,
            message: 'food item updated',
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in updatefoodcontroller",
            error,
        })
    }
}

//delete food

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "provide food id",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with id",
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item Deleted ",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Delete Food APi",
            error,
        });
    }
}

//place order
const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                succes: false,
                message: 'provide food cart or payment method',
            })
        }
        //calculate price
        let total = 0
        cart.map((i) => {
            total += i.price;
        })

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        })
        await newOrder.save();
        res.status(201).send({
            success: true,
            message: 'order placed successfully',
            newOrder,
        })
    }
    catch (error) {
        console.log(error)
        res.status.send(500)({
            success: false,
            message: 'error in place order API',
            error,
        })
    }
}

//change order status

const changeOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: 'please provide valid order id'
            })
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true })
        res.status(200).send({
            success: true,
            message: 'order status updated',
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Change Order Status',
            error
        })
    }
}

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    changeOrderStatus

}