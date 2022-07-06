import express from "express"
const router = express.Router()
import {authUser,registerUser, getUserProfile, updateUserProfile, getAllUsers} from "../controllers/userController.js"
import {protect, admin} from "../middlewear/authMiddleware.js"

router.route("/").post(registerUser).get(protect, admin, getAllUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)


export default router