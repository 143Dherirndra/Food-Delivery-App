
import express from 'express';
import { googleAuth, resetpassword, sendotp, signIn, signOut, signup, verifyotp } from '../controller/auth.controller.js';
import { getCurrentUser } from '../controller/user.controller.js';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router();

userRouter.post('/current',isAuth, getCurrentUser);


export default userRouter;

