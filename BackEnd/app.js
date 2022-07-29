const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const session = require("express-session");
var cors = require('cors')

const port = process.env.PORT || 3001;
const Routes = require("./Routes/index.routes")

const { sequelize } = require('./Util/DB/connection');
const Relaciones = require('./Util/DB/Relaciones');



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    },
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(multer({ storage: fileStorage }).single("Image"));

app.use(express.static(path.join(__dirname, 'Public')));
app.use("/Images", express.static(path.join(__dirname, 'Images')));

app.use(session({ secret: "anything", resave: true, saveUninitialized: false }));

app.use((req, res, next) => {
    res.locals.Login = req.session.AdminIsAuthenticated;
    res.locals.LoginElector = req.session.ElectorIsAuthenticated;
    res.locals.Elector = req.session.Elector;
    next();
});


//DB CONFIGURATION
Relaciones();
sequelize.sync().then(() => { console.log('Connection sucessfully') }).catch(e => console.log(e));

//Routes
app.use(Routes);

//create port
app.listen(port, () => {
    console.log(`Server running in http://loaclhost:${port}`)
});


