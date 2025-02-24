export async function errorHandler(error, request, response, next) {
	console.log(error.message);
	response.status(400).send(error.message);
}
