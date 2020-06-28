const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));
app.use(cors());


require('./controllers/authController')(app);
require('./controllers/projectController')(app);


app.listen(4000);