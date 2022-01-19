const baseUri = process.env.NEXT_PUBLIC_API_PATH

const get = async <T>(url: string): Promise<T> => {
	const requestOptions = {
		method: "GET"
	}
	return await fetch(baseUri + url, requestOptions).then(handleResponse)
}

const post = async <T>(url: string, body: any): Promise<T> => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}
	return await fetch(baseUri + url, requestOptions).then(handleResponse)
}

const put = async <T>(url: string, body: any): Promise<T> => {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}
	return await fetch(baseUri + url, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async <T>(url: string): Promise<T> => {
	const requestOptions = {
		method: "DELETE"
	}
	return await fetch(baseUri + url, requestOptions).then(handleResponse)
}

// helper functions
const handleResponse = (response: any) => {
	// Uses .text() so that there is no error for an empty response
	return response.text().then((text: any) => {
		const data = text && JSON.parse(text)

		// Status codes in the 400s and 500s are errors
		if (response.status > 399) {
			const error = data || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}

const handler = {
	get,
	post,
	put,
	delete: _delete
}

export default handler
