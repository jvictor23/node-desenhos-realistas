require('dotenv').config();

const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(cors());
app.use('/file', express.static(path.resolve(__dirname, '..', 'tmp/', 'uploads')))

require('./controllers/authController')(app);
require('./controllers/projectController')(app);
require('./controllers/postController')(app);
require('./controllers/viewPostController')(app);


app.listen(process.env.PORT || 4000);