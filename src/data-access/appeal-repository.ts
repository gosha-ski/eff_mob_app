import { pool } from './db-connection';
import { AppealI, Status } from '../common/interfaces';
import { v4 } from 'uuid';
import { AppealDTO } from '../common/dto';

async function getAppealById(id: string): Promise<AppealI | null> {
	try {
		const result = await pool.query(`SELECT * FROM appeals WHERE id = $1`, [id]);
		return result.rows[0];
	} catch (error) {
		return null;
	}
}

async function createAppeal(data: AppealDTO): Promise<string | null> {
	try {
		const id = v4();
		const { payload, theme } = data;
		const status = Status.new;
		const result = await pool.query(`INSERT INTO appeals (id, theme, payload, status)  values ($1, $2, $3, $4);`, [
			id,
			theme,
			payload,
			status,
		]);
		return id;
	} catch (error) {
		return null;
	}
}

async function takeAppealToWork(id: string): Promise<string | null> {
	try {
		const status = Status.processed;
		const result = await pool.query(`update appeals set status=$1 where id=$2;`, [status, id]);
		return id;
	} catch (error) {
		return null;
	}
}

async function finishAppealById(id: string): Promise<string | null> {
	try {
		const status = Status.finished;
		const result = await pool.query(`update appeals set status=$1 where id=$2;`, [status, id]);
		return id;
	} catch (error) {
		return null;
	}
}

async function denyAppealById(id: string, other: any): Promise<string | null> {
	try {
		const status = Status.denied;
		const result = await pool.query(`update appeals set status=$1, other=$3 where id=$2;`, [status, id, other]);
		return id;
	} catch (error) {
		return null;
	}
}

async function denyAllAppeals(): Promise<string | null> {
	try {
		const denied = Status.denied;
		const processed = Status.processed;
		const result = await pool.query(`update appeals set status=$1 where status=$2;`, [denied, processed]);
		return 'done';
	} catch (error) {
		return null;
	}
}

async function getAllAppealsByDate(date: string): Promise<AppealI[] | null> {
	try {
		const result = await pool.query(`SELECT * FROM appeals WHERE date_trunc('day', date) = $1::date`, [date]);
		return result.rows;
	} catch (error) {
		return null;
	}
}

async function getAllAppealsInDiapason(from: string, to: string): Promise<AppealI[] | null> {
	try {
		const result = await pool.query(`SELECT * FROM appeals WHERE date >= $1 AND date <=$2`, [from, to]);
		return result.rows;
	} catch (error) {
		return null;
	}
}

async function getAllAppeals(): Promise<AppealI[] | null> {
	try {
		const result = await pool.query(`SELECT * FROM appeals`);
		return result.rows;
	} catch (error) {
		return null;
	}
}

export const appealRepository = {
	getAppealById,
	createAppeal,
	takeAppealToWork,
	finishAppealById,
	denyAppealById,
	denyAllAppeals,

	getAllAppealsByDate,
	getAllAppealsInDiapason,
	getAllAppeals,
};
