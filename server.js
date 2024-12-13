const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cardRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const passport = require('passport');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());

mongoose.connect('mongodb://10.12.12.252:27017/cards')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


app.use('/api/auth', authRoutes)
app.use('/api/cards', cardRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});