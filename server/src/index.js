var express = require('express');
var app = express();
var cors = require('cors');

const PORT = process.env.PORT || 3000;
var r = module.exports.r = require('rethinkdbdash')({ db: 'itsalmost_clone' });

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/countdowns', require('./routes/countdown'));

app.listen(PORT, () => console.log('itsalmost-clone listening on ' + PORT));