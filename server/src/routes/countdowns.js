var express = require('express');
var Joi = require('joi');
var { handleJoi, slugify } = require('../util');
var { r } = require('../');
var router = module.exports = express.Router();

router.post('/', async (req, res) => {
  if (!handleJoi(newCountdownSchema, req, res)) return;
  let slug = slugify(req.body.name);
  let insert = await r.table('countdowns').insert({
    slug,
    name: req.body.name,
    expires: req.body.expires
  }).run();
  let id = insert.generated_keys[0];
  await r.table('countdowns').get(id).update({ slug: slug + '-' + id.split('-')[0]  });
  let countdown = await r.table('countdowns').get(id);
  res.status(201).json({
    ok: true,
    countdown
  });
});

router.get('/:slug', async (req, res) => {
  let countdown = await r.table('countdowns').filter({ slug: req.params.slug }).run()
  if (!countdown) res.status(404).json({ ok: false, error: 'Unknown countdown' });
  res.json({ ok: true, countdown });
});

var newCountdownSchema = Joi.object().keys({
  name: Joi.string().max(100).required(),
  expires: Joi.date().min(Date.now()).required()
}).required();