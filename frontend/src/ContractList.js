import { useLoaderData, Link } from "react-router-dom";
// Should display a list of all contracts
// Should have Checkboxes to change the status of contracts to view
    // Boxes should change what type of contracts shown in list
// Each contract in list should have link to detailed view of contracts as defined by Contract.js
async function loadContracts() {
	const response = await fetch(`http://localhost:3001/contracts`);
	return await response.json();
}

export default function Contracts() {
	const list = useLoaderData();
	console.log(list);

	return (
		<>
			{list.map((item) => (
				<article key={item._id}>
					<h2>{item.title}</h2>
					<Link to={`/contracts/${item._id}`}><h3>{item._id}</h3></Link>
				</article>
			))}
		</>
	);
}

export { loadContracts };