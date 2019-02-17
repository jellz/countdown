var Joi = require('joi');

exports.handleJoi = (schema, req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    if (!result.error.isJoi) {
      console.error(`Error while running Joi at ${Date.now()}: ${result.error}`);
      res.sendStatus(500);
      return false;
    }
    res.status(400).json({ ok: false, error: result.error.details.map(item => item.message)[0] });
    return false;
  } else return true;
}

exports.slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '') 
    .replace(/-+$/, '');
}