const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/desenhos_realistas', {useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
