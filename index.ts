import express from 'express';
import bodyParser from "body-parser";
import router from "./src/router/router";
import {AppDataSource} from "./src/data-source";
import cors from 'cors';
const hostname = 'localhost';
const port = 3001;

const app = express();

AppDataSource.initialize().then(() => {
    console.log('Connect Database Success')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('', router)

// Use http://localhost:3001/ with your router definition to debug
app.listen(3001, () => {
    console.log(`Server is running http://${hostname}:${port}/`)
})
