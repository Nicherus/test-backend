import { HttpError } from '../utils/errors';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export default new class UsersController {
	usersRepository = getConnection().getRepository(User);

	registerUser = async (username: string, password: string, email: string, phone: number) : Promise<User> => {
		
		const user = new User;
		user.username = username;
		user.password = password;
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

		const findUser = await this.usersRepository.findOne({ where: {id: userId}, select: ["id", "username", "phone", "email"] });

		if(!findUser) throw new HttpError(404, 'user id not found');

		return findUser;
	};

	updateUser = async (userId: string, email: string, phone: number) : Promise<User> => {

		const user = await this.getUserById(userId);

		user.email = email || user.email;
		user.phone = phone || user.phone;

		await user.save();

		return user;
	}

	deleteUser = async (userId: string) : Promise<boolean> => {

		const deletedUser = await this.usersRepository.delete(userId);

		if(!deletedUser) throw new HttpError(500, 'please, send this to a developer');

		return true;
	}

};