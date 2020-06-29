const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(cors());


require('./controllers/authController')(app);
require('./controllers/projectController')(app);
require('./controllers/postController')(app);


app.listen(4000);