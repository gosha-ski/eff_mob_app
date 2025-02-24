import { appealRepository } from '../data-access/appeal-repository';
import { AppealDTO } from '../common/dto';
import { Status, AppealI } from '../common/interfaces';

async function getAllAppeals(date: string | undefined, from: string | undefined, to: string | undefined): Promise<AppealI[]> {
	let result: AppealI[] | null;
	if (date) {
		result = await appealRepository.getAllAppealsByDate(date);
	} else if (from && to) {
		result = await appealRepository.getAllAppealsInDiapason(from, to);
	} else {
		result = await appealRepository.getAllAppeals();
	}
	if (!result) {
		throw new Error('getAllAppeals error');
	}
	return result;
}

async function getAppealById(id: string): Promise<AppealI> {
	const result = await appealRepository.getAppealById(id);
	if (!result) {
		throw new Error('getAppealById error');
	}
	return result;
}

async function createAppeal(data: AppealDTO): Promise<string> {
	const result = await appealRepository.createAppeal(data);
	if (!result) {
		throw new Error('createAppeal error');
	}
	return result;
}

async function takeAppealToWork(id: string): Promise<string> {
	const appeal = await getAppealById(id);
	if (appeal.status === Status.processed) {
		return 'appeal alredy in work';
	} else if (appeal.status === Status.finished) {
		return 'appeal alredy in finished';
	} else {
		const result = await appealRepository.takeAppealToWork(id);
		if (!result) {
			throw new Error('takeAppealToWork error');
		}
		return result;
	}
}

async function finishAppealById(id: string): Promise<string> {
	const appeal = await getAppealById(id);
	if (appeal.status === Status.denied) {
		return 'appeal was denied';
	} else if (appeal.status === Status.finished) {
		return 'appeal alredy finished';
	} else if (appeal.status === Status.new) {
		return 'appeal only created but it not in work status';
	} else {
		const result = await appealRepository.finishAppealById(id);
		if (!result) {
			throw new Error('finishAppealById error');
		}
		return result;
	}
}

async function denyAppealById(id: string, other: any): Promise<string> {
	const appeal = await getAppealById(id);
	if (appeal.status === Status.denied) {
		return 'appeal was already denied';
	} else if (appeal.status === Status.finished) {
		return 'appeal alredy finished';
	} else {
		if (!other) {
			other = null;
		}
		const result = await appealRepository.denyAppealById(id, other);
		if (!result) {
			throw new Error('denyAppealById error');
		}
		return result;
	}
}

async function denyAllAppeals(): Promise<string> {
	const result = await appealRepository.denyAllAppeals();
	if (!result) {
		throw new Error('denyAllAppeals error');
	}
	return result;
}

export const appealUseCases = {
	getAllAppeals,
	getAppealById,
	createAppeal,
	takeAppealToWork,
	finishAppealById,
	denyAppealById,
	denyAllAppeals,
};
