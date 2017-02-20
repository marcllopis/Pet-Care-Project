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
  location:{
    lat: 41.390205,
    long: 2.154007
  },
  address: 'BCN',
});

const takers = [
  {
    name: 'Spiderman',
    surname: 'Parker',
    email: 'spiderman@gmail.com',
    password: 'spiderpass',
    role: 'PETTAKER',
    location:{
      lat: 41.390205,
      long: 2.154007
    },
    address: 'New York City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of dogs',
    status: 'all day'
  },
  {
    name: 'Batman',
    surname: 'Wayne',
    email: 'batman@gmail.com',
    password: 'batpass',
    role: 'PETTAKER',
    location:{
      lat: 42.390205,
      long: 2.354007
    },
    address: 'Barcelona',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of puppies',
    status: 'all day'
  },
  {
    name: 'Superman',
    surname: 'Parker',
    email: 'superman@gmail.com',
    password: 'superpass',
    role: 'PETTAKER',
    location:{
      lat: 41.890205,
      long: 2.254007
    },
    address: 'Hospitalet City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Love your pets',
    status: 'only weekends'
  },
  {
    name: 'Aquaman',
    surname: 'Fishy',
    email: 'aquaman@gmail.com',
    password: 'aquapass',
    role: 'PETTAKER',
    location:{
      lat:41.990205,
      long: 2.154007
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
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
