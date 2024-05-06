import {Router} from "express";
import {ObjectId} from "mongodb";
import unitsRouter from "./unitsRouter";
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

// Create a contract
ContractsRouter.post("/contracts", async (req, res) => {
    const db = req.app("db");

    try {
        const result = db.collection("contracts").insertOne(req.body);
        res.status(201).json(result.insertedId);
    } catch (error) {
        res.status(500).end();
    }
});

// Update contract status
ContractsRouter.put("/contracts/:contractId", async (req, res) => {
    const db = req.app("db");
    
    try {
        const collection = db.collection("contracts");
        const { id } = req.params;
        const { status } = req.body;

        await collection.updateOne({ _id: ObjectId(id)}, {$set: {status}});
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }

});

// Update Contract unit (only unit number not type)
ContractsRouter.put("/contracts/:contractId", async (req, res) => {
    const db = req.app("db");
    
    try {
        const collection = db.collection("contracts");
        const { id } = req.params;
        const { status } = req.body;

        await collection.updateOne({ _id: ObjectId(id)}, {$set: {unitNumber}});
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }
    
});

// Update Contract time (ie reset start time or set closed time)
ContractsRouter.put("/contracts/:contractId", async (req, res) => {
    const db = req.app("db");
    
    try {
        const collection = db.collection("contracts");
        const { id } = req.params;
        const { status } = req.body;

        await collection.updateOne({ _id: ObjectId(id)}, {$set: {closeTime}});
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }
    
});

// Delete contract (should not be used beyond testing refer to unit status)
ContractsRouter.delete("/contracts/:contractId", async (req, res) => {
    const db = req.app("db");

    try {
        const collection = db.collection("contracts");
        const { id } = req.params;

        await collection.deleteOne({ _id: ObjectId(id) });
        res.status(201);

    } catch (error) {
        res.status(500).end();
    }
});

export default ContractsRouter