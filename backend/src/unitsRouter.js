import { Router } from "express";
import { ObjectId } from "mongodb";
const UnitsRouter = Router();
UnitsRouter.mergeParams = true;
/*  Unit Object Descirption
*   Unique Serial ID for database
*   Category Number for unit type   ie 107 = Carpet Cleaner
*   Unit Number for within category ie 00301 = 301st unit of that category
*       Full displayed number would be 107-00301 = 301st Carpet Cleaner
*   Unit Price  How much it costs to rent for a 24hr period
*   Unit Status
        Available   Ready To Rent
        On-Repair   Under maintenance/broken Not ready to rent
        Out         Out on a contract 
        Lost        Lost and no longer part of active inventory unable to re-add
*/

// List units
UnitsRouter.get("/", async(req, res) =>{
    console.log("Lost request");
    const db = req.app.get("db");
    const units = await db.collection("units").find().toArray();
    return res.json(units);
});
// Create a unit
UnitsRouter.post("/", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const result = await db.collection("units").insertOne(req.body);
            res.status(201).json(result.insertedId);
        } catch (error) {
            console.error("Error creating unit:", error);
            res.status(500).json({ error: "Failed to create unit" });
        }
    });
// Get number of units in category
UnitsRouter.get("/number/:categoryNumber", async(req,res)=>{
    const db = req.app.get("db");
    const unit = await db.collection("units").find({category: parseInt(req.params.categoryNumber)}).count();
    return res.json(unit);
});

// Get unique unit category from the list of units
UnitsRouter.get("/unique", async(req,res)=>{
    const db = req.app.get("db");
    const categories = await db.collection("units").distinct("category");
    return res.json(categories); 
});
// Get list of units in that category
UnitsRouter.get("/:unitCategory/list", async(req,res)=>{
    const db = req.app.get("db");
    const units = await db.collection("units").find({category:parseInt(req.params.unitCategory)}).toArray();
    return res.json(units); 
});
// Update a unit status and price
UnitsRouter.put("/:unitCategory/:unitNumber/update", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const collection = db.collection("units");
    

            await collection.updateOne({ category: parseInt(req.params.unitCategory), $and: [{number: parseInt(req.params.unitNumber)}] },
                { $set: { status: req.body.status, price: parseInt(req.body.price) } });

            res.status(201).end();
        } catch (error) {
            res.status(500).end();
        }
    });
// Finds unit by id
UnitsRouter.get("/:unitCategory/:unitNumber", async(req, res) =>{
    const db = req.app.get("db");
    console.log(req.params);
    const unit = await db.collection("units").findOne({ category: parseInt(req.params.unitCategory), number: parseInt(req.params.unitNumber) });
	return res.json(unit);
});
// Delete a unit (should not be used beyond testing refer to unit status)
UnitsRouter.delete("/:unitId", async (req, res) => {
        const db = req.app.get("db");
    
        try {
            const collection = db.collection("units");
            const { unitId } = req.params;
    
            await collection.deleteOne({ _id: new ObjectId(unitId) });
            res.status(201);
        } catch (error) {
            res.status(500).end();
        }
});
    
export default UnitsRouter;