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
*   Contract Status
*       Active:         unit still rented
*       Closed:         unit was returned
*       Collections:    unit was stolen
*/

// Create a contract

// Update contract status

// Update Contract unit (only unit number not type)

// Update Contract time (ie reset start time or set closed time)

// Delete contract (should not be used beyond testing refer to unit status)