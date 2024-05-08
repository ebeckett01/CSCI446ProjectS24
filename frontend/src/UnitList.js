import { useLoaderData, Link } from "react-router-dom";
import "./ContractList.css";
// Should have list of all units based on checkboxes
// Checkboxes should update what units are shown
// Units in list should be clickable to show detailed view of units
async function loadUnits() {
    const response = await fetch(`http://localhost:3001/units`);
    return await response.json();
}

export default function Units() {
    const list = useLoaderData();
    console.log(list);

    return (
        <>
			<h1><Link to={`/units/new`}>Create New Unit</Link></h1>
            <table>
				<tr>
					<th>Unit ID</th>
					<th>Unit Type</th>
					<th>Unit Number</th>
					<th>Unit Description</th>
					<th>Unit Price</th>
                    <th>Unit Status</th>
				</tr>
				{list.map(unit=>(
					<tr key={unit._id}>
						<td><Link to={`/units/${unit.category}/${unit.number}`}>{unit.category}-{unit.number}</Link></td>
						<td>{unit.category}</td>
						<td>{unit.number}</td>
						<td>{unit.description}</td>
						<td>{unit.price}</td>
                        <td>{unit.status}</td>
					</tr>
				))}
			</table>
        </>
    );
}

export { loadUnits };