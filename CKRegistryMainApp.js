import React from "react";
import ReactDOM from 'react-dom/client';
import CKRegistryApp from "./CKRegistryApp";

import "./CKRegistryApp.module.scss";

const ckRegistryAppRootEl = document.getElementById("ck-registry");
if (ckRegistryAppRootEl) {

	const ckRegistryAppRoot = ReactDOM.createRoot(ckRegistryAppRootEl);
	ckRegistryAppRoot.render(
		<CKRegistryApp/>
	);

}
