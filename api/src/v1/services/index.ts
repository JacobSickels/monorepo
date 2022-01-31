// @ts-ignore
import { prisma } from "@Libs/prisma"
import { Dog, DogSex } from "@prisma/client"
import CrudInterface, { ListParams } from "@Utils/crudInterface"
import { getRandomValueFromArray } from "@Utils/randomFromArray"

// Things you do in a service:
// Query your database
// Authentication logic
// Communicate with other services (i.e. Use the AKC API)
// Any other business logic (i.e. converting currencies, pick colors of flowers, etc.)

export default class DogService implements CrudInterface<Dog> {
	get(params: { dogId: string }): Promise<Dog | null> {
		return prisma.dog.findUnique({ where: { id: params.dogId } })
	}

	list({ where, skip, take }: ListParams<Dog>): Promise<Dog[]> {
		const { sex, ...rest } = where
		const newWhere = { sex: sex?.toUpperCase() as DogSex, ...rest }
		return prisma.dog.findMany({ where: newWhere, skip, take })
	}

	create(dog: Dog): Promise<Dog> {
		return prisma.dog.create({
			data: {
				callName: "asdf",
				akcBreed: "asdf",
				sex: getRandomValueFromArray<DogSex>(["MALE", "FEMALE"]),
				birthdate: "faker.date.past()",
				birthplace: "faker.address.countryCode(),",
				akcRegisteredName: "faker.name.title() + ",
				akcTitlePrefix: "AKC",
				akcTitleSuffix: "AKC",
				akcMeasuredHeight: Math.floor(Math.random()) * (24 - 12 + 1) + 12,
				registrationNumber: "faker.datatype.uuid(),",
				breederName: "faker.name.firstName() + ",
				sireName: "faker.name.firstName(),",
				damName: "faker.name.firstName(),",
				primaryOwnerId: "faker.datatype.uuid(),",
				jumpHeight: Math.floor(Math.random()) * (24 - 12 + 1) + 12
			}
		})
	}

	delete(params: { dogId: string }): Promise<Dog | null> {
		return prisma.dog.delete({ where: { id: params.dogId } })
	}

	update(params: Dog): Promise<Dog | null> {
		const { id, ...dog } = params

		return prisma.dog.update({ where: { id }, data: dog })
	}
}
