import { HttpError } from '../utils/errors';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export default new class UsersController {
	usersRepository = getConnection().getRepository(User);

	registerUser = async (username: string, password: string) : Promise<User> => {
		
		const user = new User;
		user.username = username;
		user.password = password;
		await user.save();

		const findUser = await this.usersRepository.findOne({where: {id: user.id}});
		
		if(!findUser) throw new HttpError(500, 'please, send this to a developer');
		
		return findUser;
	};

	getUser = async (userId: string) : Promise<User> => {

		const findUser = await this.usersRepository.findOne({ where: {id: userId}, select: ["username", "phone", "email"] });

		if(!findUser) throw new HttpError(404, 'user id not found');

		return findUser;
	};

	getAllUsers = async () : Promise<User[]> => {

		const findUsers = await this.usersRepository.find({ select: ["username"] });

		if(!findUsers) throw new HttpError(500, 'please, send this to a developer');

		return findUsers;
	};

	updateUser = async (userId: string, phone: number, email: string) : Promise<User> => {

		const user = await this.getUser(userId);

		user.phone = phone;
		user.email = email;

		user.save()

		return user;
	}

	deleteUser = async (userId: string) : Promise<boolean> => {

		const deletedUser = await this.usersRepository.delete(userId);

		if(!deletedUser) throw new HttpError(500, 'please, send this to a developer');

		return true;
	}

};