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
		phone: joi.number().min(8).required()
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
		phone: joi.number().min(8).required(),
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