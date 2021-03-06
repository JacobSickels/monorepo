import { Dog, DogSex } from "@prisma/client"
import { ResponseError } from "@Utils/errorHandlers"
import { setPagerDefaults } from "@Utils/setPagerDefaults"
import { RequestHandler } from "express"
import DogService from "../services/index"

// Things you would do in a controller:
// Create response payloads (for instance, getting rid of unnecessary values)
// Setting response statuses
// Returning error codes
// Validate request structures (i.e. make sure the request parameters are correct)

const dogService = new DogService()

const getDog: RequestHandler = async (req, res, next) => {
	const { dogId } = req.params

	const dog = await dogService.get({ dogId })
	if (dog) {
		const { callName } = dog
		return res.status(200).json({ callName })
	}

	throw new ResponseError("Dog not found", { statusCode: 404 })
}

const listDogs: RequestHandler<{}, any, any, { skip?: string; take?: string; sex: DogSex }> = async (
	req,
	res,
	next
) => {
	const { skip, take, ...where } = setPagerDefaults(req.query, 0, 10)

	const dogs = await dogService.list({ where, skip, take })
	if (dogs.length) {
		return res.status(200).json(dogs)
	}

	throw new ResponseError("No dogs found", { statusCode: 404 })
}

const createNewDog: RequestHandler = async (req, res, next) => {
	const dogs = await dogService.create({} as Dog)
	return res.status(200).json(dogs)
}

const deleteDog: RequestHandler = async (req, res, next) => {
	const { dogId } = req.params

	const dog = await dogService.delete({ dogId })
	if (dog) {
		return res.status(200).json(dog)
	}

	throw new ResponseError("Dog not found", { statusCode: 404 })
}

const updateDog: RequestHandler<{}, Dog, any, any> = async (req, res, next) => {
	const dog = req.body

	const result = await dogService.update(dog)
	if (result) {
		return res.status(200).json(result)
	}

	throw new ResponseError("Dog not found", { statusCode: 404 })
}

export default {
	getDog,
	listDogs,
	createNewDog,
	deleteDog,
	updateDog
}
