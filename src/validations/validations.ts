import joi from 'joi';

export const validateRegisterUser = (
	username: string,
	password: string,
	email: string,
	phone: number
) : boolean => {

	const match = joi.object({
		username: joi.string().max(20).required(),
		password: joi.string().min(6).required(),
		email: joi.string().email().required(),
		phone: joi.number().required()
	});

	const data = {
		username,
		password,
		email,
		phone
	};

	const validation = match.validate(data);
	
	return !!validation.error;
};

export const validateUpdateUser = (
	email: string,
	phone: number,
	id: string
) : boolean => {

	const match = joi.object({
		email: joi.string().email().required(),
		phone: joi.number().required(),
		id: joi.string().uuid().required(),
	});

	const data = {
		email,
		phone,
		id
	};

	const validation = match.validate(data);
	
	return !!validation.error;
};

export const validateId = (id: string) : boolean => {

	const match = joi.object({
		id: joi.string().uuid().required(),
	});

	const data = { id };

	const validation = match.validate(data);
	
	return !!validation.error;
};

export const validateLogin = (
	username: string,
	password: string,
) : boolean => {

	const match = joi.object({
		username: joi.string().required(),
		password: joi.string().min(6).required(),
	});

	const data = {
		username,
		password
	};

	const validation = match.validate(data);
	
	return !!validation.error;
};

export const validateUpdatePassword = (oldPassword: string, newPassword: string, id: string) : boolean => {

	const match = joi.object({
		oldPassword: joi.string().min(6).required(),
		newPassword: joi.string().min(6).required(),
		id: joi.string().uuid().required()
	});

	const data = { 
		oldPassword,
		newPassword,
		id
	};

	const validation = match.validate(data);
	
	return !!validation.error;
};

export const validateContact = (
	name: string,
	email: string,
	phone: number
) : boolean => {

	const match = joi.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		phone: joi.number().required(),
	});

	const data = {
		name,
		email,
		phone
	};

	const validation = match.validate(data);
	
	return !!validation.error;
};