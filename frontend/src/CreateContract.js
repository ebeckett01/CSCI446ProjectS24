import { useState } from "react"
import { BASE_URL } from "./utils";
import { useLoaderData, Link } from "react-router-dom";

/* Create a form to gather data for making a new contract
*  Needed Information
*       Customer First Name
*       Customer Last Name
*       Customer Phone Number
*       Unit Category
*       Unit Number
*/
// Should have drop downs for Unit Category and Unit Number
// Should populate Unit Number based on avaliable units from database
// On submit send form data to backend to create contract and link to detailed view of contract
async function loadContractId() {
    const numberReq = await fetch(`http://localhost:3001/contracts/number`);
	const numberRes = await numberReq.json();
	const unitCategoryReq = await fetch(`http://localhost:3001/units/unique`);
	const unitCategoryRes = await unitCategoryReq.json();
	const unitListReq = await fetch(`http://localhost:3001/units`);
	const unitListRes = await unitListReq.json();
    return {number: numberRes, category: unitCategoryRes, units:unitListRes};
}
export default function CreateForm() {
    const data = useLoaderData();
	const initialFormData = {
        contractId: data.number,
		fName: '',
        lName: '',
        phone: '',
        unitCategory: "-1",
        unitNumber: "-1",
        startTime: new Date(),
        endTime: new Date(),
        status: 'Open',
	};
	const initialUnitList = {
		list: data.units,
	};
	const initialResultMessage = {
		msg: '',
		newId: null,
	};
	// INFO: Rather than use separate hooks, let's jam the state together
	const [formData, setFormData] = useState(initialFormData);
	const [unitList, setUnitList] = useState(initialUnitList)
	const [message, setMessage] = useState(initialResultMessage);
	//console.log(unitList.list);
	const handleChange = async (event) => {
        //console.log(event.target);
		const type = event.target.type;
        //console.log(type);
        if(type == "text"){
            setFormData({
                ...formData,
                [event.target.placeholder]: event.target.value,
            });
        }else if(type == "select-one"){
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }
		if(event.target.name == "unitCategory"){
			console.log(`Looking up stuff for cat: ${event.target.value}`);
			const listReq = await fetch(`http://localhost:3001/units/${event.target.value}/list`);
			const listRes = await listReq.json();
			setUnitList({
				list: listRes,
			});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
        console.log(formData);
		if(formData.fName === "" || formData.lName === ""){
			console.error("Invalid Name");
			return;
		}else if(formData.phone ===""){
			console.error("Invalid Phone Number");
			return;
		}else if(formData.unitCategory === "-1"){
			console.error("Invalid Unit Category");
			return;
		}else if(formData.unitNumber === "-1"){
			console.error("Invalid Unit Number");
			return;
		}
		const result = await fetch(`${BASE_URL}/contracts/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (result.status !== 201) {
			setMessage({ msg: "Failed to create new whatever...", newId: null });
			return;
		}

		const newId = await result.json();
        console.log(newId);
		setMessage({ msg: "Successfully created!", newId });
        
		setFormData(initialFormData);
	}

	return (
		<>
			{message.msg ?
				<>
					<label>{message.msg}</label>
					<Link to={`/contracts/${message.newId}`}>Newly created whatever</Link>
				</>
				: null
			}
			<form onSubmit={handleSubmit}>
				<label>Customer First Name</label>
				<input type="text" placeholder="fName" value={formData.fName} onChange={handleChange} />
				<br />
                <label>Customer Last Name</label>
				<input type="text" placeholder="lName" value={formData.lName} onChange={handleChange} />
				<br />
                <label>Customer Phone Number</label>
				<input type="text" placeholder="phone" value={formData.phone} onChange={handleChange} />
				<br />
                <label>Unit Category</label>
				<select name="unitCategory" value={formData.unitCategory} onChange={handleChange}>
                    <option value="-1"></option>
					{data.category.map(unitCat=>(
						<option value={unitCat}>{unitCat}</option>
					))}
                </select>
                <br/>
                <label>Unit Number</label>
				<select name="unitNumber" onChange={handleChange}>
                    <option value="-1" ></option>
					{unitList.list.map(unit=>(
						<option value={unit.number}>{unit.number}</option>
					))}
                </select>
                <br/>
				<button type="submit">Create</button>
			</form>
		</>
	)
}
export{ loadContractId };