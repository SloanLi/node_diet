import express from 'express'
import DietController from '../controller/diet';
const router = express.Router()
const diet=new DietController()
router.post('/post',diet.postDiet);
router.put('/put',diet.putDiet)
router.get('/get',diet.getDiet)
router.delete('/delete',diet.deleteDiet)


export default router
