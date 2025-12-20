// import express from 'express';
// import { signIn, signOut, signup } from '../controller/auth.controller.js';

// const authRouter= express.Router();

// authRouter.post('/signup',signup);
// authRouter.post('/signIn',signIn);
// authRouter.get('/signOut',signOut);

// export default authRouter;

import express from 'express';
import { googleAuth, resetpassword, sendotp, signIn, signOut, signup, verifyotp } from '../controller/auth.controller.js';
import { getCurrentUser } from '../controller/user.controller.js';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router();

userRouter.post('/current',isAuth, getCurrentUser);


export default userRouter;

