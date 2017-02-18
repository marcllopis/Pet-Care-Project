/*jshint esversion: 6 */
const mongoose = require('mongoose');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const User = require('../models/user');
const Pet = require('../models/pet');

mongoose.connect("mongodb://localhost/petcare");


const owner = new User({
  name: 'Marc',
  surname: 'Llopis',
  email: 'marcllopis89@gmail.com',
  password: 'marcpass',
  role: 'OWNER',
  address: {
    streetName: 'Mallorca',
    number: '659',
    zipCode: '08027',
    city: 'Barcelona',
    Country: 'Spain'
  },
  phoneNumber: '+34677798451',
});

const takers = [
  {
    name: 'Guy',
    surname: 'Guy2',
    email: 'guy@gmail.com',
    password: 'guypass',
    role: 'PETTAKER',
    address: {
      streetName: 'Mallorca',
      number: '659',
      zipCode: '08027',
      city: 'Barcelona',
      Country: 'Spain'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of dogs',
    status: 'available'
  },
  {
    name: 'Laura',
    surname: 'BlaBla',
    email: 'laura@gmail.com',
    password: 'laurapass',
    role: 'PETTAKER',
    address: {
      streetName: 'Bailen',
      number: '659',
      zipCode: '08027',
      city: 'UK',
      Country: 'Spain'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 13,
    slogan: 'Master of cats',
    status: 'available'
  },
  {
    name: 'Chris',
    surname: 'Bryan',
    email: 'chris@gmail.com',
    password: 'chrispass',
    role: 'PETTAKER',
    address: {
      streetName: 'Napols',
      number: '17',
      zipCode: '08027',
      city: 'Madrid',
      Country: 'Spain'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Pets love me',
    status: 'available'
  },
  {
    name: 'Andrew',
    surname: 'Superlongsurname',
    email: 'andrew@gmail.com',
    password: 'andrewpass',
    role: 'PETTAKER',
    address: {
      streetName: 'Gran via',
      number: '659',
      zipCode: '08027',
      city: 'Hospitalet',
      Country: 'Spain'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Super long slogan to check what happens',
    status: 'only morning time'
  },
  {
    name: 'Britney',
    surname: 'Whatever',
    email: 'britney@gmail.com',
    password: 'britneypass',
    role: 'PETTAKER',
    address: {
      streetName: 'Arago',
      number: '659',
      zipCode: '08027',
      city: 'Barcelona',
      Country: 'Spain'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'I love to take care of your pet',
    status: 'night time'
  },
  {
    name: 'Vincent',
    surname: 'Blabla',
    email: 'vincent@gmail.com',
    password: 'vincentpass',
    role: 'PETTAKER',
    address: {
      streetName: 'Streeeeet',
      number: '659',
      zipCode: '08027',
      city: 'Barcelona',
      Country: 'Spain'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of puppies',
    status: 'only weekends'
  },
  {
    name: 'Spiderman',
    surname: 'Parker',
    email: 'spiderman@gmail.com',
    password: 'spidermanpass',
    role: 'PETTAKER',
    address: {
      streetName: 'NewYork',
      number: '659',
      zipCode: '08027',
      city: 'NewYork',
      Country: 'USA'
    },
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of spiders',
    status: 'all day long'
  },
];



User.create(owner, (err, user) => {
  if (err) {
    throw err;
  }
  console.log(owner);
});

User.create(takers, (err, docs)=>{
  if (err) { throw err };
    docs.forEach( (takers) => {
      console.log(takers.name)
    })
    mongoose.connection.close();
});
