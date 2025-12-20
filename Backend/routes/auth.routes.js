// import express from 'express';
// import { signIn, signOut, signup } from '../controller/auth.controller.js';

// const authRouter= express.Router();

// authRouter.post('/signup',signup);
// authRouter.post('/signIn',signIn);
// authRouter.get('/signOut',signOut);

// export default authRouter;

import express from 'express';
import { googleAuth, resetpassword, sendotp, signIn, signOut, signup, verifyotp } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signIn', signIn);
authRouter.post('/sigout', signOut);
authRouter.post('/sendotp',sendotp);
authRouter.post('/verifyotp', verifyotp);
authRouter.post('/resetotp', resetpassword);
authRouter.post('/googleAuth', googleAuth);

export default authRouter;

