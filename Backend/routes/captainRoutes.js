import express from 'express'
import { body } from 'express-validator';
const router=express.Router();
import {registerCaptain,loginCaptain,logoutCaptain,getCaptainProfile} from '../controllers/captainController.js';
import { authCaptain } from '../middleware/authMiddleware.js';
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 character long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1 '),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto','truck']).withMessage('Invalid vehicle'),

],registerCaptain
)
router.post('/login',[
    body('email').isEmail().withMessage("Invalid Emial"),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')

],loginCaptain
)

router.get('/profile',authCaptain,getCaptainProfile)
router.get('/logout',authCaptain,logoutCaptain)
export default router