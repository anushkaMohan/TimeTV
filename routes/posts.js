const express=require('express');
const router=express.Router();

const postsController=require('../controllers/postsController');

router.post('/create',postsController.create);

module.exports=router;