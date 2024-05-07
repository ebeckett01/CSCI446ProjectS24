import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Layout from './Layout';
import ContractList, { loadContracts } from "./ContractList";
import CreateContract, { loadContractId } from "./CreateContract";
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