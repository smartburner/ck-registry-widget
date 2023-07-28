import React from "react";
import styles from "./CKRegistryErrorHandler.module.scss";
import resourcesUrl from "../../utils/resourcesUrl";

const CKRegistryErrorHandler = (props) => {

	return (
		<div className={styles['ck-registry-error']}>

			<img
				src={resourcesUrl + 'error_icon.svg'}
				className={styles['ck-registry-error__icon']}
				alt="Error"
			/>

			<h5 className={styles['ck-registry-error__title']}>
				{props.errorMessage}
			</h5>

			<p className="ck-registry-error__message">
				Please try again
			</p>
		</div>
	);

}

export default CKRegistryErrorHandler;
