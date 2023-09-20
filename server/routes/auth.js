
import express from 'express'
import {login} from '../controllers/auth.js'

const router = express.Router()

//ye hamar auth/login hoga kiyokin auth me hum ese use karege
router.post("/login",login)

export default router;