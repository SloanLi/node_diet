import express from 'express'
import UserController from '../controller/user';
const router = express.Router()
const user=new UserController()
router.get('/getOpenId',user.getOpenId);
router.post('/user',user.postUser);


export default router
