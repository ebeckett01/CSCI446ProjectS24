import { useLoaderData, Link } from "react-router-dom";
import { BASE_URL } from "./utils";

// Should display detailed unit information
// Should have option to change unit status (from dropdown)
// Should have option to change unit price  (type in new price 1-9999)
async function loadUnit(request) {
	console.log(request.params);
    const unitCategory = request.params.category;
	const unitNumber = request.params.number;
    const response = await fetch(`http://localhost:3001/units/${unitCategory}/${unitNumber}`);
    return await response.json();
}
/*	TODO List
*	Dropdown for unit status
*	Input for unit price update
*/
var price = 0;
const handlePrice = (event)=>{
	console.log("price event");
	// Update price variable
}
const submitPrice = async(event)=>{
	console.log("Price update");
	// Update price on backend
}
const handleStatus = (event) =>{
	console.log("status event");
	// change status variable
}
const submitStatus = async(event) =>{
	console.log("Status update")
	// Update status on backend
}
export default function Unit() {
	const unit = useLoaderData();

	console.log(unit);

	return (
		<>
			<article>
				<h1>Unit ID: {unit.category}-{unit.number}</h1>
				<p>Category: {unit.category}</p>
				<p>Number: {unit.number}</p>
				<p>Decription: {unit.description}</p>
				<p>Status: {unit.status}</p>
				<p>Price: {unit.price}</p>
			</article>
			<select name="unitStatus" onChange={handleStatus}>
				<option value="Avaliable">Avaliable</option>
				<option value="Out on Repair">Out on Repair</option>
				<option value="Lost">Lost</option>
			</select>
			<button type="submit" onClick={submitStatus}>Update Status</button>
			<br/>
			<input type="number" value={price} onChange={handlePrice}></input>
			<button type="submit" onClick={submitPrice}>Update Price</button>
		</>
	)
}

export { loadUnit };