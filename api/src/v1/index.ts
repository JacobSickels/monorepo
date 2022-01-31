console.log('V1 1')
import { Router } from "express"
console.log('V1 2')
import clubs from "./routes/clubs"
console.log('V1 3')
import dogs from "./routes/dogs"
console.log('V1 4')
import trials from "./routes/trials"
console.log('V1 5')
import users from "./routes/users"
console.log('V1 6')

const router = Router()

router.use("/clubs", clubs)
router.use("/dogs", dogs)
router.use("/trials", trials)
router.use("/users", users)

// Ping v1
router.get("/", async (req, res) => {
	res.status(200).json({ message: "v1 of the API is up and running!" })
})

export default router
