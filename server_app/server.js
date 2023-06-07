import express from "express";
import cors from "cors";
import { db } from "./models/index.js";
import { config } from 'dotenv';
// import { getHome } from "./controllers/home.js";
// import { imageRouter } from "./controllers/image.controller.js";
// import { fileCheck } from "./utils/multerFileHandler.js";
import { employeRouter } from "./routes/employe.routes.js";
import { etablissementRouter } from "./routes/etablissement.routes.js";
import { imageRouter } from "./routes/image.routes.js";
import { demandeRouter } from './routes/demande.routes.js';
import { agentRouter } from "./routes/agent.routes.js";
import { ipRouter } from "./routes/ip.routes.js";
const app = express();
// const router = express.Router();

// dotenv
config();

const corsOptions = {
    origin: "http://localhost:8081"
};

// middlewares  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// test routes  

// app.use("/", router);

// router.get("/", getHome);

// router.post("/upload", fileCheck.single("file"), uploadFile);


// app routes
app.use('/api/employes', employeRouter);
app.use('/api/etablissements', etablissementRouter);
app.use('/api/images', imageRouter);
app.use('/api/demandes', demandeRouter);
app.use('/api/agents', agentRouter);
app.use('/api/ip', ipRouter);

db.sequelize.sync({ force: true }).then(() => {
    
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});