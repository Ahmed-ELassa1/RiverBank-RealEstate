import dotenv from "dotenv";
import path from "path";
import express from "express";
import Bootstrap from "./src/Bootstrap.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config({ path: path.resolve("./config/.env") });
const app = express();
app.use(express.static('build'));
Bootstrap(app, express);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});


app.listen(process.env.PORT_KEY, () => {
  console.log(`server is running on port ${process.env.PORT_KEY}`);
});
