const express = require('express');
const passport = require('passport');
const multer = require('multer');
const Card = require('../models/Card');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
  const { title, subtitle, description } = req.body;
  const card = new Card({ title, subtitle, description, image: req.file.path });
  await card.save();
  res.status(201).send(card);
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const cards = await Card.find();
  res.send(cards);
});

router.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
  const { title, subtitle, description } = req.body;
  const card = await Card.findById(req.params.id);
  if (req.file) {
    card.image = req.file.path;
  }
  card.title = title;
  card.subtitle = subtitle;
  card.description = description;
  await card.save();
  res.send(card);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;