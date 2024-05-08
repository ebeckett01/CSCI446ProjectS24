import { useLoaderData } from "react-router-dom";
import { BASE_URL } from "./utils";
// Should display detailed information on contract
// Customer Information
// Unit Information

// Should be able to modify Contract
// Dropdown to change unit number (not unit category)
// Button to close contract (with pop-up to confirm)
// Button to report contract as stolen

async function loadContract(request) {
	console.log(request);
	const contractId = request.params.contractId;
	const response = await fetch(`http://localhost:3001/contracts/${contractId}`);
	return await response.json();
}

export default function Project() {
	var contract = useLoaderData();
    var unitNumber = "-1";
    const handleChange = (event) =>{
        if(event.target.type == "select-one"){
            unitNumber = event.target.value; 
        }
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        const result = await fetch(`${BASE_URL}/contracts/${contract._id}/unit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({newNumber: unitNumber}),
		});
        if(result.status !== 201){
            console.error("Failed query");
        }else{
            setTimeout(function(){Document.location.reload();},500);
        }
        // Update contract with new info
    }
    const handleClose = async(event) =>{
        event.preventDefault();
        const result = await fetch(`${BASE_URL}/contracts/${contract._id}/status`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({newStatus: "Closed"}),
		});
        if(result.status !== 201){
            console.error("Failed query");
        }
        // Update contract with new info
        window.location.reload();
    }
	console.log(contract);
	return (
		<>
			<article>
				<h1>Contract Number: {contract.contractId}</h1>
                <h3>Customer Name: {contract.fName} {contract.lName}</h3>
                <h3>Unit Category: {contract.unitCategory}</h3>
                <h3>Unit Number: {contract.unitNumber}</h3>
                <h3>Contract Status: {contract.status}</h3>
			</article>
            <label>Swap Unit on Contract</label>
            <select name="unitNumber" onChange={handleChange}>
                <option value="1"> Temp 1</option>
                <option value="2"> Temp 2</option>
                <option value="3"> Temp 3</option>
                <option value="4"> Temp 4</option>
            </select>
            <button type="Submit" onClick={handleSubmit}>Swap</button>
            <button type="Submit" onClick={handleClose}>Close Contract</button>
		</>
	)
}

export { loadContract };