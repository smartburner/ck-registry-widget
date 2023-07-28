import React, {useContext} from "react";
import styles from "./CKRegistryMobileModal.module.scss";
import CKRegistryContext from "../../ckRegistryContext";

const CKRegistryMobileModal = (props) => {

	const appContext = useContext(CKRegistryContext);

	const closeButtonClickHandler = () => {

		props.setIsMobileModalOpened(false);

		if (appContext.activeChevraKadisha.ckId !== -1) {
			props.resetActiveChevraKadisha();
		}
	}

	const backButtonClickHandler = () => {
		props.resetActiveChevraKadisha();
	}

	return (
		<div
			className={
				appContext.isMobileModalOpened ?
					styles['ck-registry-mobile-modal'] + " " + styles['ck-registry-mobile-modal_active'] :
					styles['ck-registry-mobile-modal']
			}
		>
			<div className={
				appContext.isSearchOccurred && appContext.activeChevraKadisha.ckId !== -1 ?
					styles['ck-registry-mobile-modal-header'] + " " + styles['ck-registry-mobile-modal-header_active-ck'] :
					styles['ck-registry-mobile-modal-header']
			}>

				{appContext.isSearchOccurred && appContext.activeChevraKadisha.ckId !== -1 && (
					<button type="button"
							className={styles['ck-registry-mobile-modal__btn'] + " " + styles['ck-registry-mobile-modal__btn_back']}
							onClick={backButtonClickHandler}
					>
						Back
					</button>
				)}

				<button type="button"
						className={styles['ck-registry-mobile-modal__btn'] + " " + styles['ck-registry-mobile-modal__btn_close']}
						onClick={closeButtonClickHandler}
				>
					<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
						<path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
					</svg>
				</button>
			</div>
			<div className={styles['ck-registry-mobile-modal-body']}>
				{props.children}
			</div>
		</div>
	)
}

export default CKRegistryMobileModal;
