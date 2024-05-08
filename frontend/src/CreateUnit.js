import { useLoaderData, Link } from "react-router-dom";
import { BASE_URL } from "./utils";
import { useLoaderData, Link } from "react-router-dom";

// Should create a unit based on form data

/* Inputs should be 
*       Unit Category
*       Unit Serial Number
*       Unit Price
*/

// Unit should initialize as availiable and unit number made by number of units already in that category
async function loadUnitId(req) {
    const response = await fetch(`http://localhost:3001/contracts/${req.params.contractId}`);
    return await response.json();
}

export default function CreateForm() {
    const data = useLoaderData();

    const initialFormData = {
        category: "0",
        // unitSerial: data._id,
        number: "0",
        price: "0"
    };

    const initialResultMessage = {
		msg: '',
		newId: null,
	};

    const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const type = event.target.type;
        if(type == "text" || type == "number"){
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                <select name="unitCategory" value={formData.unitCategory} onChange={handleChange}>
                    <option value="1" >Temp 1</option>
                    <option value="2" >Temp 2</option>
                    <option value="3" >Temp 3</option>
                    <option value="4" >Temp 4</option>
                </select>
                <label>Unit Serial Number</label>

                <br/>
                <label>Unit Number</label>
                <select name="unitNumber" onChange={handleChange}>
                    <option value="1" >Temp 1</option>
                    <option value="2" >Temp 2</option>
                    <option value="3" >Temp 3</option>
                    <option value="4" >Temp 4</option>
                </select>
                <br/>

                <label>Unit Price</label>
                <input type  = "number" placeholder="price" value = {formData.unitPrice}></input>

            </form>
        </>
    )
}