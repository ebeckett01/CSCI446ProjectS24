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
