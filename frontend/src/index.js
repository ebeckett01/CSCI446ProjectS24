import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css';
import Layout from './Layout';
import ContractList, { loadContracts } from "./ContractList";
import CreateContract, { loadContractId } from "./CreateContract";
import Contract, {loadContract} from "./Contract";
import UnitList, { loadUnits } from "./UnitList";
import Unit, { loadUnit } from "./Unit";
import CreateUnit, {loadUnitData} from "./CreateUnit";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <ContractList/>,
        		loader: loadContracts,
			},
			{
				path: "/new",
				element: <CreateContract/>,
        		loader: loadContractId,
			},
      		{
				path: "/contracts/:contractId",
				element: <Contract/>,
				loader: loadContract,
      		},
			{
				path: "/units",
				element: <UnitList/>,
				loader: loadUnits,
			},
			{
				path: "/units/:category/:number",
				element: <Unit/>,
				loader: loadUnit,
			},
      {
        path:  "/units/new",
        element: <CreateUnit/>,
        loader: loadUnitData,
      }
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();