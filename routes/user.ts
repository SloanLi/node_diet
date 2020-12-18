import express from 'express'
import UserController from '../controller/user';
const router = express.Router()
const user=new UserController()
router.get('/getOpenId',user.getOpenId);
router.post('/post',user.postUser);
router.put('/put',user.putUser)
router.get('/get',user.getUser)
router.delete('/delete',user.deleteUser)


export default router
