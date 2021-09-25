import { HttpError } from '../utils/errors';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../entities/User';

export default new class UsersController {
	usersRepository = getConnection().getRepository(User);

	registerUser = async (username: string, password: string, email: string, phone: number) : Promise<User> => {
		
		const user = new User;
		user.username = username;
		user.password = bcrypt.hashSync(password, 10);
		user.email = email;
		user.phone = phone;

		await user.save();

		const findUser = await this.usersRepository.findOne({where: {id: user.id}, select: ["id", "username", "phone", "email"]});
		
		if(!findUser) throw new HttpError(500, 'please, send this to a developer');
		
		return findUser;
	};

	getAllUsers = async () : Promise<User[]> => {

		const findUsers = await this.usersRepository.find({ select: ["id", "username"] });

		if(!findUsers) throw new HttpError(500, 'please, send this to a developer');

		return findUsers;
	};

	getUserById = async (userId: string) : Promise<User> => {

		const findUser = await this.usersRepository.findOne({ where: {id: userId} });

		if(!findUser) throw new HttpError(404, 'user not found');

		return findUser;
	};

	findUserByUsername = async (username: string) : Promise<User> => {
		const user = await this.usersRepository.findOne({ where: { username } });
		return user;
	}

	updateUser = async (userId: string, email: string, phone: number) : Promise<User> => {

		const user = await this.getUserById(userId);
		if(!user) throw new HttpError(404, 'user not found');

		user.email = email || user.email;
		user.phone = phone || user.phone;

		await user.save();

		delete user.password;

		return user;
	}

	deleteUser = async (userId: string) : Promise<Boolean> => {

		const deletedUser = await this.usersRepository.delete(userId);

		if(!deletedUser) throw new HttpError(500, 'please, send this to a developer');

		return true;
	}

	login = async (username: string, password: string) : Promise<any> => {
		const user = await this.findUserByUsername(username);
	
		if (!user) throw new HttpError(400, 'username or password not valid');
	
		const checkPassword = bcrypt.compareSync(password, user.password)
	
		if(checkPassword){
			const { id } = user;
			const token = jwt.sign({ id }, process.env.SECRET, {
				expiresIn: 86400,
			});

			return {id, token};
		}

		throw new HttpError(401, 'username or password not valid');
	}

	updatePassword = async ({oldPassword, newPassword}, userId: string) : Promise<Boolean> => {
		const user = await this.getUserById(userId);

		if (!user) throw new HttpError(404, 'user not found');

		const checkPassword = bcrypt.compareSync(oldPassword, user.password)

		if (!checkPassword) throw new HttpError(401, 'wrong password');
		user.password = bcrypt.hashSync(newPassword, 10);

		await user.save();

		return true;
	}
};