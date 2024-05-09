import { useLoaderData, Link } from "react-router-dom";
import "./ContractList.css";
import { useState } from "react"
// Should display a list of all contracts
// Should have Checkboxes to change the status of contracts to view
// Boxes should change what type of contracts shown in list
// Each contract in list should have link to detailed view of contracts as defined by Contract.js
async function loadContracts() {
	const response = await fetch(`http://localhost:3001/contracts`);
	return await response.json();
}

export default function Contracts() {
	//console.log(list);
	const [search, setSearch] = useState('');
	const [list, setList] = useState(useLoaderData());
	const handleChange = async (event) =>{
		setSearch(event.target.value);
		var req = await fetch(`http://localhost:3001/contracts`);
		if(event.target.value !== ""){
			req = await fetch(`http://localhost:3001/contracts/search/${event.target.value}`);
		}
		setList(await req.json());
	}
	return (
		<>
		<input type="text" name="searchBar" placeholder="Search Contracts" value={search} onChange={handleChange}></input>
			<table>
				<tr>
					<th> Contract Number</th>
					<th> Customer Name</th>
					<th> Customer Phone #</th>
					<th> Unit Rented</th>
					<th> Contract Status</th>
				</tr>
				{list.map(contract=>(
					<tr key={contract._id}>
						<td><Link to={`/contracts/${contract.contractId}`}>{contract.contractId}</Link></td>
						<td>{contract.fName} {contract.lName}</td>
						<td>{contract.phone}</td>
						<td>{contract.unitCategory}</td>
						<td>{contract.status}</td>
					</tr>
				))}
			</table>
		</>
	);
}

export { loadContracts };