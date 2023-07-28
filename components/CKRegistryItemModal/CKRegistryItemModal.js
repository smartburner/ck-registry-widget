import React from "react";
import styles from "./CKRegistryItemModal.module.scss";
import CKRegistrySingleView from "../CKRegistrySingleView/CKRegistrySingleView";

const CKRegistryItemModal = (props) => {

	const closeButtonClickHandler = () => {
	  props.setModalIsActive(false);
	  props.resetActiveChevraKadisha();
	}

	return (
		<div className={styles['ck-registry-item-modal']}>
			<div className={styles['ck-registry-item-modal-header']}>
				<button type="button" className={styles['ck-registry-item-modal__close']}
						onClick={closeButtonClickHandler}
				>
					<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
						<path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
					</svg>
				</button>
			</div>

			<CKRegistrySingleView/>
		</div>
	)
}

export default CKRegistryItemModal;
