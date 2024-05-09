Areas of complexity
Dynamic Selection Lists
    The selection lists on the contract for swapping units and initially creating the contract had decent some initial difficulties. The first was how to send a request whenever a change was detected without breaking the form. This was done mainly through addition fetch requests with the data we needed the updateing a variable with the results.

Swapping and Selecting Units
    Swapping out which unit was on a contract had some issues with getting the data to update but was resolved by seperating the unit Id into 2 parts category and number. Category refering the the type of unit and number being the specific unit in that category.

Interesting Parts of the Project
Search Bar

Future Work
Filtering of units: Only allow units that show as avaliable to be added to contracts and swapped out with.
Unit Status Update on Contract: If a unit is swapped on contract or open/closed on a contract it updates the status as needed