import { useLoaderData, Link } from "react-router-dom";
import { BASE_URL } from "./utils";
import { useState } from "react"

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

	const initialFormData = {
        price: unit.price,
        status: unit.status,
    };

	const initialResultMessage = {
		msg: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);

	const handleChange = (event) => {
        const type = event.target.id;
		if (type == "status"){
            setFormData({
                ...formData,
                status: event.target.value,
            });
        } else if (type == "price"){
            setFormData({
                ...formData,
                price: parseInt(event.target.value),
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);

		const result = await fetch(`${BASE_URL}/units/${unit.category}/${unit.number}/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (result.status !== 201) {
			setMessage({ msg: "Failed to update unit..."});
			return;
		}

		setMessage({ msg: "Successfully modified unit!" });
    }

	return (
		<>
			<article>
				<h1>Unit ID: {unit.category}-{unit.number}</h1>
				<p>Category: {unit.category}</p>
				<p>Number: {unit.number}</p>
				<p>Serial: {unit.serial}</p>
				<p>Decription: {unit.description}</p>
				<form onSubmit={handleSubmit}>
					<label>Price: </label>
					<input id="price" type="number" placeholder="Price" value = {formData.price} onChange={handleChange}></input>
					<br/><br/>
					<label>Status: </label>
					<select id="status" value={formData.status} onChange={handleChange}>
						<option value="Available">Available</option>
						<option value="Lost">Lost</option>
						<option value="On-Repair">On-Repair</option>
						<option value="Out">Out</option>
					</select>
					<br/><br/>
					<button type="submit">Submit</button>
				</form>

				{message.msg ?
				<>	
					<br></br>
					<label>{message.msg}</label>
				</>
				: null
				}
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