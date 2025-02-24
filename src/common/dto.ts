import { IsString } from 'class-validator';

export class AppealDTO {
	@IsString()
	theme: string;

	@IsString()
	payload: string;
}
