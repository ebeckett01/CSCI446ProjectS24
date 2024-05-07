import {Router} from "express";
import {ObjectId} from "mongodb";
import unitsRouter from "./unitsRouter.js";
/*  Contract Object Description
*   Unique Serial ID for database
*   Contract Number 6 digits    ie 000001 is first contract
*   Unit Category               ie what type of unit is rented
*   Unit Number                 ie which specific unit is rented
*   Time Created                ie when contract was made
*   Time Closed                 ie when contract was closed
*   Customer First and Last Name
*   Customer Phone Number
*   Contract Status
*       Active:         unit still rented
*       Closed:         unit was returned
*       Collections:    unit was stolen
*/

const ContractsRouter = Router()

// get active contracts
ContractsRouter.get("/", async(req, res) =>{
    const db = req.app.get("db");
    const contracts = await db.collection("contracts").find().toArray();
    return res.json(contracts);
});
// Get new contract number
ContractsRouter.get("/number", async(req,res)=>{
    const db = req.app.get("db");
    const contracts = await db.collection("contracts").count();
    return res.json(contracts);
});
// Create a contract
ContractsRouter.post("/new", async (req, res) => {
    console.log(req.body);
    const db = req.app.get("db");

    try {
        const result = await db.collection("contracts").insertOne(req.body);
        res.status(201).json(result.insertedId);
    } catch (error) {
        res.status(500).end();
    }
});
// Get single contract
ContractsRouter.get("/:contractId", async (req, res) =>{
    const db = req.app.get("db");
	const contract = await db.collection("contracts").findOne({ contractId: parseInt(req.params.contractId) });
	return res.json(contract);
});
// Update contract status
ContractsRouter.put("/:contractId/status", async (req, res) => {
    const db = req.app.get("db");
    
    try {
        const collection = await db.collection("contracts");
        const { id } = req.params;
        const { status } = req.body;

        await collection.updateOne({ _id: ObjectId(id)}, {$set: {status}});
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }

});

// Update Contract unit (only unit number not type)
ContractsRouter.put("/:contractId/unit", async (req, res) => {
    const db = req.app.get("db");
    
    try {
        const collection = await db.collection("contracts");
        //console.log(req.params.contractId);
        //console.log(req.body.newNumber);

        await collection.updateOne(
            { _id: new ObjectId(req.params.contractId)}, 
            { $set: {unitNumber: req.body.newNumber}}
        );
        res.status(201);

    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
    
});

// Update Contract time (ie reset start time or set closed time)
ContractsRouter.put("/:contractId", async (req, res) => {
    const db = req.app.get("db");
    
    try {
        const collection = await db.collection("contracts");
        const { id } = req.params;
        const { status } = req.body;

        await collection.updateOne({ _id: ObjectId(id)}, {$set: {closeTime}});
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }
    
});

// Delete contract (should not be used beyond testing refer to unit status)
ContractsRouter.delete("/:contractId", async (req, res) => {
    const db = req.app.get("db");

    try {
        const collection = await db.collection("contracts");
        const { id } = req.params;

        await collection.deleteOne({ _id: ObjectId(id) });
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }
});

export default ContractsRouter