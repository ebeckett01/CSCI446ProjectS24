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
		</>
	)
}

export { loadUnit };