import express from "express"
import cors from "cors"
const app = express()
const PORT = 5000

import v1 from "./routes/v1"

// Sentry
// import { initSentry } from "./services/sentry/index"
// initSentry()

// Firebase
// import { initFirebase } from "./services/firebase"
// initFirebase()

app.use(cors())
app.use(express.json())

// Routes
// import auth from "./routes/auth"
// app.use("/auth", auth)

// Just ping the server, that's it.
app.get("/", async (req: any, response: any) => {
	response.json({ message: "The server...she lives!" })
})

app.use("/v1", v1)

app.listen(PORT, () => console.log(`Server Running on port ${PORT}.`))

// app.get("/error", async (req: any, response: any) => {
// This creates a start time for the op for Sentry to mark as the start of the request.
// 	const transaction = Sentry.startTransaction({
// 		op: "test",
// 		name: "My First Test Transaction"
// 	})

// 	setTimeout(() => {
// 		try {
// 			foo() // Is undefined so we get a throw
// 		} catch (e) {
// 			Sentry.captureException(e)
// 		} finally {
// This finishes the request from above, creating an interval of time in which this op occurred.
// 			transaction.finish()
// 			response.status(500).send({ message: "We messed up :(" })
// 		}
// 	}, 99)
// })
