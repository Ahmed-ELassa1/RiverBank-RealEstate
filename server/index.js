import dotenv from "dotenv"
import path from "path"
import express from "express"
import Bootstrap from "./src/Bootstrap.js"

dotenv.config({ path: path.resolve("./config/.env") })
const app = express()
Bootstrap(app, express)
app.listen(process.env.PORT_KEY, () => {
    console.log(`server is running on port ${process.env.PORT_KEY}`);
})