export enum Status {
	new = 'new',
	processed = 'processed',
	finished = 'finished',
	denied = 'denied',
}

export interface AppealI {
	id: string;
	theme: string;
	payload: string;
	status: Status;
	other: null | string;
	date: Date;
}

// export interface AppealDTO {
// 	theme: string;
// 	payload: string;
// }
