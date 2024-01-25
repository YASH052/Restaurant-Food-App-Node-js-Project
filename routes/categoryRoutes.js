const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');

const router = express.Router()

//routes
//create category

router.post('/create', authMiddleware, createCatController);


//get all cat
router.get("/getAll", getAllCatController)

//update Cat
router.put('/update/:id', authMiddleware, updateCatController)

//delete cat
router.delete('/delete/:id', authMiddleware, deleteCatController)

module.exports = router;    