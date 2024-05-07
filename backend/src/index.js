import express from "express";
import cors from "cors";
import unitsRouter from "./unitsRouter.js";
import contractsRouter from "./contractsRouter.js";
import { MongoClient } from "mongodb";
// Constant information for backend server
const port = 3001;  // Port that the frontend would use for requests
const database_address = "mongodb://localhost:27017";   // Mongo DB address
async function connect() {
	const client = new MongoClient(database_address);
	const connection = await client.connect();
	return connection.db("rental-database");
}
// Setup of App
const app = express();
app.use(cors());
app.use(express.json());

// Setup of routers
app.use("/unit", unitsRouter);
app.use("/contracts", contractsRouter);

// Database confirmation
const database = await connect();
app.set("db", database);
app.get("/", (req, res) => {
    res.send("Backend is Working");
});
// logging of server information
app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});