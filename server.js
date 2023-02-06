import dotenv from "dotenv"
import express from "express"
import morgan from "morgan";
import cors from "cors";


dotenv.config()


const app = express()

const PORT = process.env.PORT || 8000
// db conneect 
import { dbConnect } from "./src/config/dbConfig.js"
dbConnect()


// middleware 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//  root url request 
app.use("/", (req, res, next) => {
    const error = {
        messsage: "you dont have permersion here"
    }
    next(error)
})

// global error handler 
app.use((error, req, res, next) => {
    const statusCode = error.errorCode || 404;
    res.status(statusCode).json({
        status: "error",
        messsage: error.messsage
    })
}
)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`server running at http://localhost:${PORT}`)
})