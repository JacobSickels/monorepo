import dotenv from "dotenv"
dotenv.config()

import moduleAlias from "module-alias"

if (process.env.ENVIRONMENT !== "development") {
	moduleAlias.addAliases({
		"@Libs": __dirname + "/libs",
		"@v1": __dirname + "/v1",
		"@Utils": __dirname + "/utils"
	})
}

import { errorHandler, ResponseError } from "@Utils/errorHandlers"
import { getRandomValueFromArray } from "@Utils/randomFromArray"
import cors from "cors"
import express from "express"
import v1 from "@v1/index"
const app = express()
const PORT = 5000

import Sentry, { initSentry } from "@Libs/sentry"
initSentry()

// Firebase
// import { initFirebase } from "./services/firebase"
// initFirebase()

// Sentry request handler must be first handler on app for Sentry reasons
app.use(Sentry.Handlers.requestHandler())
app.use(cors())
app.use(express.json())

app.use("/v1", v1)

// Ping the server
app.get("/", async (req, res) => {
	const messages = [
		"Go, dog, go.",
		"See Spot run.",
		"What kind of dog likes taking a bath every day? A shampoo-dle.",
		"What do you get when you cross a dog and a computer? A megabyte."
	]

	return res.status(200).json({ message: getRandomValueFromArray(messages) })
})

// Force an error
// Please only use this route for development and testing purposes.
app.get("/error", (req, res) => {
	throw new ResponseError(`API Error in environment: ${process.env.ENVIRONMENT}`, { statusCode: 418 })
})

// Error handlers
// Must come after ALL other middlewares and routes!
// Sentry error handler must be first error handler for Sentry reasons
app.use(Sentry.Handlers.errorHandler())
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Running on port ${PORT}.`))
