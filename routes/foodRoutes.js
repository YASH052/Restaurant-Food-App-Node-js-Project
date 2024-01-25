const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware')
const { createFoodController, getAllFoodsController, getSingleFoodController, getByResturantController, updateFoodContoller, updateFoodController, deleteFoodController, placeOrderController, changeOrderStatus } = require('../controllers/foodController');


const router = express.Router()

//routes
router.post('/create', authMiddleware, createFoodController)

//get foods
router.get('/getAll', getAllFoodsController)

//singlefood
router.get('/get/:id', getSingleFoodController)

//getfoodbyresturant
router.get('/getByResturant/:id', getByResturantController)

//UPDATE FOOD
router.put('/update/:id', authMiddleware, updateFoodController)

//delete food
router.put('/delete/:id', authMiddleware, deleteFoodController)

//place order
router.post('/placeorder', authMiddleware, placeOrderController)

//order status
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, changeOrderStatus)

module.exports = router;    