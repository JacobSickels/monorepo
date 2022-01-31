// @ts-ignore
import { prisma } from "@Libs/prisma"
import { Router } from "express"

const router = Router()

// Write a new row
router.post("/", async (req, response) => {
	const resp = await prisma.club.create({
		data: {
			name: "test"
		}
	})

	return response.status(200).json(resp)
})

// Get all rows
router.get("/", async (req, response) => {
	const all = await prisma.club.findMany()
	return response.status(200).json(all)
})

router.put("/", async (req, res) => {
	const { id, ...club } = req.body
	const update = await prisma.club.update({ where: { id }, data: club })
	return res.status(200).json({ message: update })
})

router.delete("/", async (req, res) => {
	const { id } = req.body
	const update = await prisma.club.delete({ where: { id } })
	return res.status(200).json({ message: update })
})

export default router
