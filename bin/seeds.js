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
    type:'Point',
    coordinates: [41.390205, 2.154007]
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
      type:'Point',
      coordinates: [41.390205, 2.154007]
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
      type:'Point',
      coordinates: [42.390205, 2.354007]
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
      type:'Point',
      coordinates: [41.890205, 2.254007]
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
      type:'Point',
      coordinates: [41.990205, 2.154007]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Ironhacker',
    surname: 'Coder',
    email: 'ironhacker@gmail.com',
    password: 'ironpass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.3843889, 2.169593099999929]
    },
    address: 'Code City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Coding pets all day',
    status: 'only weekend'
  },
  {
    name: 'Darth Vader',
    surname: 'Skywalker',
    email: 'darth@gmail.com',
    password: 'aquapass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.405859, -8.523700100000042]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Luke',
    surname: 'Skywalker',
    email: 'luke@gmail.com',
    password: 'lukepass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.39580509999999, 2.1918571999999585]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Jar Jar',
    surname: 'Binks',
    email: 'jarjar@gmail.com',
    password: 'jarpass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.3969391, 2.189640700000041]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Frodo',
    surname: 'Baggins',
    email: 'frodo@gmail.com',
    password: 'frodopass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.40503289999999, 2.19103419999999]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Gollum',
    surname: 'Precious',
    email: 'gollum@gmail.com',
    password: 'gollumpass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [40.4137818, -3.6921270999999933]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Gandalf',
    surname: 'Grey',
    email: 'gandalf@gmail.com',
    password: 'gandalfpass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.39581630000001, 2.1887362999999596]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Ironman',
    surname: 'Stark',
    email: 'Ironman@gmail.com',
    password: 'ironpass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.4080056, 2.1902811999999585]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Jaime',
    surname: 'Lannister',
    email: 'jaime@gmail.com',
    password: 'jaimepass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [39.568009, 2.6305170000000544]
    },
    address: 'Beach City',
    phoneNumber: '+34677798451',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 15,
    slogan: 'Master of fishes',
    status: 'only weekend'
  },
  {
    name: 'Tyrion',
    surname: 'Lannister',
    email: 'tyrion@gmail.com',
    password: 'tyrionpass',
    role: 'PETTAKER',
    location:{
      type:'Point',
      coordinates: [41.4097037, 2.1892365999999583]
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
