import { HttpError } from '../utils/errors';
import { getConnection } from 'typeorm';

import { Contact } from '../entities/Contact';

export default new class ContactsController {
	contactsRepository = getConnection().getRepository(Contact);

	createContact = async ({name, email, phone}, userId: string) : Promise<Contact> => {
		
		const contact = new Contact;
		contact.name = name;
		contact.email = email;
		contact.phone = phone;
		contact.user_id = userId;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {id: contact.id}});
		
		if(!findContact) throw new HttpError(500, 'Please, send this to a developer');
		
		return findContact;
	};

	editContact = async ({name, email, phone}, contactId: string, userId: string) : Promise<Contact> => {
		const contact = await this.getContactById(contactId);
		if(!contact) throw new HttpError(404, 'Contact not found');
		
		if(contact.user_id !== userId) throw new HttpError(401, 'unauthorized');

		contact.name = name || contact.name;
		contact.email = email || contact.email;
		contact.phone = phone || contact.phone;

		await contact.save();

		const findContact = await this.contactsRepository.findOne({where: {id: contactId}});
		
		if(!findContact) throw new HttpError(500, 'Please, send this to a developer');

		return findContact;
	};

	getContactById = async (contactId: string) : Promise<Contact> => {
		const findContact = await this.contactsRepository.findOne({where: {id: contactId}});
		
		if(!findContact) throw new HttpError(500, 'Please, send this to a developer');
		
		return findContact;
	};

	getAllContacts = async (userId: string) : Promise<Contact[]> => {
		const findContact =  await this.contactsRepository.find({where: {user_id: userId}});

		if(!findContact) throw new HttpError(500, 'Please, send this to a developer');

		return findContact;
	};

	deleteContact = async (contactId: string) : Promise<Boolean> => {

		const deletedContact = await this.contactsRepository.delete(contactId);

		if(!deletedContact) throw new HttpError(500, 'Please, send this to a developer');

		return true;
	};
};