const fs = require('fs/promises');
const path = require('path');
const dbPath = path.join(__dirname, './contactsDB.json');

const listContacts = async () => {
    const list = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(list);
};

const getContactById = async (id) => {
    const list = await listContacts();
    return list.find((contact) => contact.id === id);
};

const removeContact = async (contactId) => {
    const contactById = await getContactById(contactId);
    if (!contactById) {
        return { message: `User with id:${contactId} not found!` };
    }
    const list = await listContacts();
    const filteredList = list.filter((el) => el.id !== contactId);
    await fs.writeFile(dbPath, JSON.stringify(filteredList));
    return { message: `User with id:${contactId} successfully deleted!` };
};

const addContact = async (body) => {
    const list = await listContacts();
    const maxId = Math.max(...list.map((el) => Number(el.id)));
    const newRecord = { id: String(maxId + 1), ...body };
    const newList = [...list, newRecord];
    await fs.writeFile(dbPath, JSON.stringify(newList));
    return newRecord;
};

const updateContact = async (contactId, body) => {
    const contactById = await getContactById(contactId);
    if (!contactById) {
        return { message: `User with id:${contactId} not found!` };
    }
    const updatedContact = { ...contactById, ...body };
    const list = await listContacts();
    const filteredList = list.filter((el) => el.id !== contactId);
    await fs.writeFile(
        dbPath,
        JSON.stringify([...filteredList, updatedContact])
    );
    return { message: `User with id:${contactId} successfully updated!` };
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
