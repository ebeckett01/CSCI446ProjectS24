import { Router } from "express";
import { ObjectId } from "mongodb";
const unitsRouter = Router();
unitsRouter.mergeParams = true;
/*  Unit Object Descirption
*   Unique Serial ID for database
*   Category Number for unit type   ie 107 = Carpet Cleaner
*   Unit Number for within category ie 00301 = 301st unit of that category
*       Full displayed number would be 107-00301 = 301st Carpet Cleaner
*   Unit Price  How much it costs to rent for a 24hr period
*   Unit Status
        Avaliable   Ready To Rent
        On-Repair   Under maintenance/broken Not ready to rent
        Out         Out on a contract 
        Lost        Lost and no longer part of active inventory unable to re-add
*/
// Create a unit
unitsRouter.post("/units", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const result = await db.collection("units").insertOne(req.body);
            res.status(201).json(result.insertedId);
        } catch (error) {
            console.error("Error creating unit:", error);
            res.status(500).json({ error: "Failed to create unit" });
        }
    });

// Update a unit status
unitsRouter.put("/units/:unitId/status", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const collection = db.collection("units");
            const { unitId } = req.params;
            const { status } = req.body;
    
            await collection.updateOne({ _id: ObjectId(unitId) }, { $set: { status } });
            res.status(201);
        } catch (error) {
            res.status(500).end();
        }
    });

// Update a unit price
unitsRouter.put("/units/:unitId/price", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const collection = db.collection("units");
            const { unitId } = req.params;
            const { price } = req.body;
    
            await collection.updateOne({ _id: ObjectId(unitId) }, { $set: { price } });
            res.status(201);
        } catch (error) {
            console.error("Error updating unit price:", error);
            res.status(500).end();
        }
    });

// Delete a unit (should not be used beyond testing refer to unit status)
unitsRouter.delete("/units/:unitId", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const collection = db.collection("units");
            const { unitId } = req.params;
    
            await collection.deleteOne({ _id: ObjectId(unitId) });
            res.status(201);
        } catch (error) {
            res.status(500).end();
        }
    });
    
export default unitsRouter;