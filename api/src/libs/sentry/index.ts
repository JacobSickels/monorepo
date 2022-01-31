const { SENTRY_DSN, ENVIRONMENT } = process.env

import { init } from "@sentry/node";
import { errorHandler, requestHandler } from '@sentry/node/dist/handlers';


export const initSentry = () => {
	if (!SENTRY_DSN) {
		return console.log("Sentry is currently disabled.")
	}

	init({
		dsn: SENTRY_DSN,
		environment: ENVIRONMENT,
		tracesSampleRate: 1.0
	})
}

export const SentryRequestHandler = requestHandler;
export const SentryErrorHandler = errorHandler;

