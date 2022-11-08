const fs = require("fs").promises;
const path = require("node:path");
const contactsPath = "../node-js-01/db/contacts.json";

 

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      console.log(JSON.parse(data).filter((el) => el.id == contactId))
    )
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      JSON.stringify(
        JSON.parse(data).filter((el) => el.id != contactId),
        null,
        2
      )
    )
    .then((data) => fs.writeFile(contactsPath, data))
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  let newContact = {
    id: Math.floor(Math.random() * 100) + 10,
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath)
    .then((data) => {
      const arr = JSON.parse(data);
      arr.push(newContact);
      return arr;
    })
    .then((data) => fs.writeFile(contactsPath, JSON.stringify(data, null, 2)))
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}