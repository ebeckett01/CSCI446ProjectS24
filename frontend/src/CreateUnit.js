import { useLoaderData, Link } from "react-router-dom";
import { BASE_URL } from "./utils";
import { useState } from "react"

// Should create a unit based on form data

/* Inputs should be 
*       Unit Category
*       Unit Serial Number
*       Unit Price
*/

// Unit should initialize as availiable and unit number made by number of units already in that category
async function loadUnitData(req) {
    const response = await fetch(`http://localhost:3001/contracts/${req.params.contractId}`);
    return await response.json();
}

export default function CreateForm() {
    const data = useLoaderData();

    const initialFormData = {
        category: "",
        number: "",
        serial: "",
        description: "",
        price: 0,
        status: 'Avaliable',
    };

    const initialResultMessage = {
		msg: '',
		newId: null,
	};

    const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const type = event.target.type;
        if(type == "text" && (event.target.placeholder != "category")){
            setFormData({
                ...formData,
                [event.target.placeholder]: event.target.value,
            });
        }else if(type == "text"){
            setFormData({
                ...formData,
                [event.target.placeholder]: parseInt(event.target.value),
            });
        }else if(type == "select-one"){
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }else if (type == "number"){
            setFormData({
                ...formData,
                [event.target.placeholder]: parseInt(event.target.value),
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const req = await fetch(`http://localhost:3001/units/number/${formData.category}`)
        const res = await req.json();
        formData.number = parseInt(res);
        console.log(formData);
		const result = await fetch(`${BASE_URL}/units`, {
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
            <form onSubmit={handleSubmit}>
                <label>Unit Category</label>
                <input type="text" placeholder="category" value={formData.category} onChange={handleChange}/>
                <br/>
                <label>Unit Serial Number</label>
                <input type="text" placeholder="serial" value={formData.serial} onChange={handleChange}/>
                <br/>
                <label>Unit Desciption</label>
                <input type="text" placeholder="description" value={formData.description} onChange={handleChange}/>
                <br/>
                <label>Unit Price</label>
                <input type="number" placeholder="price" value = {formData.price} onChange={handleChange}></input>

                <br/>
                <button type="submit">Create</button>
            </form>
        </>
    )
}
export {loadUnitData};