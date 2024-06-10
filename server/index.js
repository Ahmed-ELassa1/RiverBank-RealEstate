import dotenv from "dotenv";
import path from "path";
import express from "express";
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory
import Bootstrap from "./src/Bootstrap.js";
const __dirname = path.resolve();


dotenv.config({ path: path.resolve("./config/.env") });
const app = express();
// app.use(express.static('static'));

Bootstrap(app, express);
app.use(express.static(path.join(__dirname, 'static')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(process.env.PORT_KEY, () => {
  console.log(`server is running on port ${process.env.PORT_KEY}`);
});
