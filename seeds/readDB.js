const Pitch = require('../models/pitches');
const Review = require('../models/reviews');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
//Database
const DB_URL = process.env.DB_URL;
const mongoose = require('mongoose');

const readDBAndWriteToFile = async function () {
  await mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongoDB connection error'));
  db.once('open', () => {
    console.log('mongoDB connection is open');
  });
  const pitches = await Pitch.find({});
  const reviews = await Review.find({});
  const users = await User.find({});

  fs.writeFileSync(
    path.join(__dirname, 'reviews.json'),
    JSON.stringify(reviews),
    (e) => {
      if (e) {
        console.log('Error fs');
        console.log(e);
      }
      console.log('Fs write succeed');
    }
  );
  fs.writeFileSync(
    path.join(__dirname, 'pitches.json'),
    JSON.stringify(pitches),
    (e) => {
      if (e) {
        console.log('Error fs');
        console.log(e);
      }
      console.log('Fs write succeed');
    }
  );
  fs.writeFileSync(
    path.join(__dirname, 'users.json'),
    JSON.stringify(users),
    (e) => {
      if (e) {
        console.log('Error fs');
        console.log(e);
      }
      console.log('Fs write succeed');
    }
  );
  await db.close();
  console.log('Database readed and writed to files');
  console.log('Please check ./reviews.json');
  console.log('Please check ./pitches.json');
  console.log('Please check ./users.json');
};

readDBAndWriteToFile();
