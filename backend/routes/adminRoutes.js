import express from "express";
import {getUsers} from '../controllers/adminController.js'

const router = express.Router();


router.get('/' , getUsers)

export default router;
