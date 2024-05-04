# Rent-A-Unit
Final Project for CSCI 446 Web Applications

## Building Instructions
1. Clone Repository 
2. Run npm i
## Project Desciption
&nbsp;&nbsp;&nbsp;&nbsp;The purpose for the website is a rental website that would display rental units available for purchase. The database would handle each unit as an entity with json values for rental information. The client view of the website would allow viewing of all units with information listing its current status and possibly a filter system to only show units meeting specific conditions. Clicking a listing would bring the client to another page to view more details and rent a unit if available. Additionally there could be an admin view page that also allows the deletion and insertion of units into the table database.\
&nbsp;&nbsp;&nbsp;&nbsp;For the frontend we will use React as specified. For the design of the website we do not have many plans besides basic CSS for now but are looking into possible frontend templates for a more clean and professional look to the website.  \
&nbsp;&nbsp;&nbsp;&nbsp;GET requests could cleanly handle displaying units available to rent in customer view and the customer would likely have limited POST access to put rental units on hold after purchase. The admin view of the website would likely have full PUT, POST, and DELETE access to be able to add, remove, or change all listings freely from the website.\
&nbsp;&nbsp;&nbsp;&nbsp;As for the database, the current plan is to use MongoDB to store all rental listings with json values specifying information on the unit (pricing, availability, location, etc.). The frontend will handle user input and transfer the appropriate information to and from the backend of the application. 

## Project Structure
### Units
#### Units have the following information stored
- Unit Category: Type of unit ie. 107 = Carpet Cleaner
- Unit Number: Unique identifier within category ie. 00001 for first unit
- Unit Status:
    - Avaliable: Ready to rent
    - On-Repair: Needs maintenance can't rent
    - Out: Out on a contract
    - Lost: Unit unavaliable forever 
- Unit Price: How much it costs to rent
#### Unit should have the following behavoirs
- Update unit status
- Update unit price
### Contracts
#### Contracts have the following information stored
- Contract Number: Unqie 6 digit number for contract ie 000001 is first contract
- Contract Status:
    - Active: Unit still on rent
    - Closed: Unit was returned
    - Collections: Unit was stolen
- Customer Name (First and Last)
- Customer Phone Number
- Start Time: When contract was started
- End Time: When contract was ended
- Unit Category: What type of unit was rented
- Unit Number: Specific unit that was rented
#### Contracts should have the following behavoir
- Change which unit was rented (within same category)
- Update contract status
- Update Contract end time
### Check-Out Process
1. Go to contracts tab 
2. Click make new contract button
3. Get Customer information
    - Customer Phone Number
    - Customer First and Last Name
4. Select the unit type
5. Select the specific unit
6. Check out button (start time)
### Check-In Process
1. Go to contracts tab
2. Select the correct contract (search name / phone number / contract number)
3. Check in button (stop time)
### Swapping Units
1. Go to contracts tab
2. Select the correct contract (search name / phone number / contract number)
3. Dropdown for other units in category
4. Click swap units button
### Getting New Units
1. Go to units tab
2. Click add new unit button
3. Fill out Information
    - Unit Category
    - Unit Price
### Removing Old Units
1. Go to units tab
2. Click desired unit (brings to detailed page)
3. Update unit status to lost from dropdown
### Update Unit Status
1. Go to units tab
2. Click desired unit (brings to detailed page)
3. Update unit status from dropdown
### Unit Was Stolen
1. Go to contracts tab
2. Select desired contract
3. Click report as stolen button