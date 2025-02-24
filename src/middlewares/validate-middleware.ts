import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export function validationMiddleware(type: any) {
	return (request, response, next) => {
		validate(plainToClass(type, request.body)).then(errors => {
			if (errors.length > 0) {
				response.status(400).send(errors);
			} else {
				next();
			}
		});
	};
}
