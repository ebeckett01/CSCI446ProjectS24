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
    const response = await fetch(`http://localhost:3001/contracts/number`);
    return await response.json();
}
export default function CreateForm() {
    const number = useLoaderData();
	const initialFormData = {
        contractId: number,
		fName: '',
        lName: '',
        phone: '',
        unitCategory: "0",
        unitNumber: "0",
        startTime: new Date(),
        endTime: new Date(),
        status: 'Open',
	};

	const initialResultMessage = {
		msg: '',
		newId: null,
	};
	// INFO: Rather than use separate hooks, let's jam the state together
	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);

	const handleChange = (event) => {
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
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
        console.log(formData);
		const result = await fetch(`${BASE_URL}/contracts/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (result.status !== 201) {
			setMessage({ msg: "Failed to create new contract...", newId: null });
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
					<Link to={`/contracts/${message.newId}`}>Newly created contract</Link>
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
                    <option value="1" >Temp 1</option>
                    <option value="2" >Temp 2</option>
                    <option value="3" >Temp 3</option>
                    <option value="4" >Temp 4</option>
                </select>
                <br/>
                <label>Unit Number</label>
				<select name="unitNumber" onChange={handleChange}>
                    <option value="1" >Temp 1</option>
                    <option value="2" >Temp 2</option>
                    <option value="3" >Temp 3</option>
                    <option value="4" >Temp 4</option>
                </select>
                <br/>
				<button type="submit">Create</button>
			</form>
		</>
	)
}
export{ loadContractId };