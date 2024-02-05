// @ts-ignore
import collect from "../utils/collect.js"
import {type GitHttpRequest, type GitHttpResponse} from "isomorphic-git";

/**
 * HttpClient
 *
 * @param {GitHttpRequest} request
 * @returns {Promise<GitHttpResponse>}
 */
export async function request(
	{
		onProgress,
		url,
		method = 'GET',
		headers = {},
		body,
	}: GitHttpRequest): Promise<GitHttpResponse> {
	// streaming uploads aren't possible yet in the browser
	if (body) {
		body = await collect(body)
	}

	const res = await fetch(url, {method, headers, body})
	const iter = res.body && res.body.getReader

	headers = {}
	for (const [key, value] of res.headers.entries()) {
		headers[key] = value
	}

	return {
		url: res.url,
		method: method,
		statusCode: res.status,
		statusMessage: res.statusText,
		body: iter,
		headers: headers,
	}
}

export default {request}