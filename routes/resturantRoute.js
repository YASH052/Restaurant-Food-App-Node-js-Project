const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantsController, getResturantById, getResturantByIdController, deleteResturantContoller } = require('../controllers/resturantController');
const { Admin } = require('mongodb');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router()

//routes
//create routes

router.post('/create', authMiddleware, createResturantController)

// GET all restaurant

router.get('/getAll', getAllResturantsController)

//GET RESTURANT BY ID || GET

router.get('/get/:id', getResturantByIdController)

//delete returant || delete

router.delete('/delete/:id', authMiddleware, deleteResturantContoller)



module.exports = router;    