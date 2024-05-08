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
	const contractReq = await fetch(`http://localhost:3001/contracts/${contractId}`);
    const contractRes = await contractReq.json();
    const unitsReq = await  fetch(`http://localhost:3001/units/${contractRes.unitCategory}/list`);
	const unitsRes = await unitsReq.json();
    //console.log(unitsRes);
    return {contract: contractRes, units:unitsRes};
}

export default function Project() {
    const data = useLoaderData();
	var contract = data.contract;
    var unitNumber = "-1";
    const handleChange = (event) =>{
        if(event.target.type === "select-one"){
            unitNumber = event.target.value; 
        }
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(unitNumber === -1){
            console.error("Invalid Selection");
            return;
        }
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
                <option value="-1"></option>
                {data.units.map(unit=>(
                    <option value={unit.number}>{unit.number}</option>
                ))}
            </select>
            <button type="Submit" onClick={handleSubmit}>Swap</button>
            <button type="Submit" onClick={handleClose}>Close Contract</button>
		</>
	)
}

export { loadContract };