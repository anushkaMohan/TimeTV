const express=require('express'); //same instance of express is used is called
const router=express.Router();
const homeController=require('../controllers/homeController')

router.get('/',homeController.home);
router.use('/users',require('./users'));

module.exports=router;