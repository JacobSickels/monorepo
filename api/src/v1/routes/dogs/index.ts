// @ts-ignore
import { prisma } from "@Libs/prisma"
import DogController from "@v1/controllers/dog"
import { Router } from "express"

const router = Router()

// Things to do in a route:
// Send the client's request to the correct route (AKA the actual routing)
// Perform authentication checks using authentication middleware

// Write a new row

router.get("/:dogId", DogController.getDog)
router.get("/", DogController.listDogs)
router.post("/", DogController.createNewDog)
router.delete("/:dogId", DogController.deleteDog)
router.put("/:dogId", DogController.updateDog)
router.patch("/:dogId", DogController.updateDog)

router.get("/primaryOwner/:primaryOwnerId", async (req, res) => {
	const { primaryOwnerId } = req.params
	const dogs = await prisma.dog.findMany({ where: { primaryOwnerId } })
	return res.status(200).json({ count: dogs.length, dogs })
})

export default router
