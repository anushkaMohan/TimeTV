const express=require('express');
const passport = require('passport');
const router=express.Router();

const usersController=require('../controllers/usersController');
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
    ),usersController.createSession);

module.exports=router;

