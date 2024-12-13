const express = require('express');
const multer = require('multer');
const Card = require('../models/Card');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
    const { title, subtitle, description } = req.body;
    const card = new Card({ title, subtitle, description, image: req.file.path });
    await card.save();
    res.status(201).send(card);
});


router.get('/', async (req, res) => {
    const cards = await Card.find();
    res.send(cards);
});


router.put('/:id', upload.single('image'), async (req, res) => {
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


router.delete('/:id', async (req, res) => {
    await Card.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;