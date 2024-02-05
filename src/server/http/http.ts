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