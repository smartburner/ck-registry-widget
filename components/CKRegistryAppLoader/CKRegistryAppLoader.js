import React from "react";
import styles from "./CKRegistryAppLoader.module.scss";
import resourcesUrl from "../../utils/resourcesUrl";


const CKRegistryAppLoader = () => {
	return (
		<div className={styles['ck-registry-app-loader']}>
			<img src={resourcesUrl + "ck-registry-preloader.svg"} alt="Loading..."/>
		</div>
	)
}

export default CKRegistryAppLoader;
