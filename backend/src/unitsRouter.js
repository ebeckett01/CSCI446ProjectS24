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

// Update a unit status

// Update a unit price

// Delete a unit (should not be used beyond testing refer to unit status)