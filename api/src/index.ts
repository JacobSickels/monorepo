import cors from "cors"
import express from "express"
// Sentry
import Sentry, { initSentry } from "./libs/sentry"
import { errorHandler, ResponseError } from "./utils/errorHandlers"
import { getRandomValueFromArray } from "./utils/randomFromArray"
import v1 from "./v1"
const app = express()
const PORT = 5000

initSentry()

// Firebase
// import { initFirebase } from "./services/firebase"
// initFirebase()

// Sentry request handler must be first handler on app for Sentry reasons
app.use(Sentry.Handlers.requestHandler())
app.use(cors())
app.use(express.json())

// app.use(successHandler)

app.use("/v1", v1)

// Just ping the server, that's it.
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
	throw new ResponseError("Test Error", { statusCode: 418 })
})

// Error handlers
// Must come after ALL other middlewares and routes!
// Sentry error handler must be first error handler for Sentry reasons
app.use(Sentry.Handlers.errorHandler())
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Running on port ${PORT}.`))
