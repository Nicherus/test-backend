import { HttpError } from '../utils/errors';
import { getConnection } from 'typeorm';

import { Contact } from '../entities/Contact';

export default new class ContactsController {
	contactsRepository = getConnection().getRepository(Contact);

	createContact = async ({username, email, phone}, userId: string) : Promise<Contact> => {
		
		const contact = new Contact;
		contact.username = username;
		contact.email = email;
		contact.phone = phone;
		contact.userId = userId;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {userId}});
		
		if(!findContact) throw new HttpError(500, 'please, send this to a developer');
		
		return findContact;
	};

	editContact = async ({username, email, phone}, userId: string) : Promise<Contact> => {
		
		const contact = new Contact;
		contact.username = username;
		contact.email = email;
		contact.phone = phone;
		contact.userId = userId;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {userId}});
		
		if(!findContact) throw new HttpError(500, 'please, send this to a developer');
		
		return findContact;
	};

	getContactById = async ({username, email, phone}, userId: string) : Promise<Contact> => {
		
		const contact = new Contact;
		contact.username = username;
		contact.email = email;
		contact.phone = phone;
		contact.userId = userId;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {userId}});
		
		if(!findContact) throw new HttpError(500, 'please, send this to a developer');
		
		return findContact;
	};

	getAllContacts = async ({username, email, phone}, userId: string) : Promise<Contact> => {
		
		const contact = new Contact;
		contact.username = username;
		contact.email = email;
		contact.phone = phone;
		contact.userId = userId;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {userId}});
		
		if(!findContact) throw new HttpError(500, 'please, send this to a developer');
		
		return findContact;
	};

	deleteContact = async ({username, email, phone}, userId: string) : Promise<Contact> => {
		
		const contact = new Contact;
		contact.username = username;
		contact.email = email;
		contact.phone = phone;
		contact.userId = userId;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {userId}});
		
		if(!findContact) throw new HttpError(500, 'please, send this to a developer');
		
		return findContact;
	};
};