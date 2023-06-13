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
import cookiesMiddleware from 'universal-cookie-express';
import { authRouter } from "./routes/auth.routes.js";
import { resetPassRouter } from "./routes/resetPassword.routes.js";

const app = express();
// const router = express.Router();

// dotenv
config();

// const corsOptions = {
//     origin: "http://localhost:3000"
// };

// middlewares  
app.use(cors());
app.use(cookiesMiddleware());

// parse requests of content-type - application/json
app.use(express.json());



// test routes  

// app.use("/", router);

// router.get("/", getHome);

// router.post("/upload", fileCheck.single("file"), uploadFile);

app.get("/", (req, res) => {
    res.send("hello , server is running");
})
// app routes
app.use('/api/auth', authRouter);
app.use('/api/resetPass', resetPassRouter);
app.use('/api/employes', employeRouter);
app.use('/api/etablissements', etablissementRouter);
app.use('/api/images', imageRouter);
app.use('/api/demandes', demandeRouter);
app.use('/api/agents', agentRouter);
app.use('/api/ip', ipRouter);

db.sequelize.sync().then(() => {

});
  


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});