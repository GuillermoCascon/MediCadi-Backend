import express from 'express';
import { register, getAccount, login, checkToken, confirmUser, forgotPassword, newPassword, updateUser, updatePassword} from '../controllers/userController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();

//public area
router.post('/', login)
router.post('/register', register)
router.get('/confirm/:token', confirmUser)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token').get(checkToken).post(newPassword)

//only for logged users
router.get('/account',checkAuth, getAccount)
router.put('/account/:id', checkAuth, updateUser)
router.put('/update-password', checkAuth, updatePassword)

export default router;