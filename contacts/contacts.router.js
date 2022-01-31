const express = require('express');
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require('./contacts.model');

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
});

contactsRouter.get('/:id', async (req, res, next) => {
    const contactById = await getContactById(req.params.id);
    if (contactById) {
        res.status(200).json({ ...contactById });
    } else {
        res.status(404).json({ message: 'Not Found' });
    }
});

contactsRouter.post('/', async (req, res, next) => {
    try {
        const newContact = await addContact(req.body);
        if (newContact) {
            res.status(201).json({ ...newContact });
        } else {
            res.status(500).json({ message: 'Error creating contact :(' });
        }
    } catch (error) {
        next(error);
    }
});

contactsRouter.delete('/:id', async (req, res, next) => {
    const response = await removeContact(req.params.id);

    res.status(200).json(response);
});

contactsRouter.put('/:id', async (req, res, next) => {});

module.exports = contactsRouter;
