import React, {useContext} from "react";
import CKRegistryList from "../CKRegistryList/CKRegistryList";

import styles from "./CKRegistrySidebar.module.scss";
import CKRegistryItemModal from "../CKRegistryItemModal/CKRegistryItemModal";
import resourcesUrl from "../../utils/resourcesUrl";
import CKRegistryContext from "../../ckRegistryContext";
import CKRegistrySingleView from "../CKRegistrySingleView/CKRegistrySingleView";
import CKRegistryErrorHandler from "../CKRegistryErrorHandler/CKRegistryErrorHandler";
import CKRegistryListItemLoader from "../CKRegistryListItemLoader/CKRegistryListItemLoader";

const CKRegistrySidebar = (props) => {

	const appContext = useContext(CKRegistryContext);

	const getClassNamesByState = () => {

		let classesStr = styles['ck-registry-sidebar'];
		if (appContext.isSidebarActive) {
			classesStr += " " + styles['ck-registry-sidebar_active'];
		}

		if (appContext.isModalActive) {
			classesStr += " " + styles['ck-registry-sidebar_modal-active'];
		}

		return classesStr;
	}

	return (
		<div
			className={getClassNamesByState()}
		>

			<div className={
				!appContext.searchResultsIsLoading ? (
					styles['ck-registry-sidebar-col'] + ' ' + styles['ck-registry-sidebar-body']
				) : (
					styles['ck-registry-sidebar-col'] + ' ' + styles['ck-registry-sidebar-body'] + ' ' + styles['ck-registry-sidebar-body_loading']
				)
			}>

				{
					appContext.isSearchOccurred || appContext.activeChevraKadisha.ckId === -1 ? (
						!appContext.searchError.isSearchError ? (

							appContext.searchResultsIsLoading ? (
								<>
									<CKRegistryListItemLoader/>
									<CKRegistryListItemLoader/>
									<CKRegistryListItemLoader/>
									<CKRegistryListItemLoader/>
								</>
							) : (
								<>
									<h3 className={styles['ck-registry-sidebar-headline']}>Results based on current search:</h3>
									<CKRegistryList
										setIsModalActive={props.setIsModalActive}
										setActiveChevraKadisha={props.setActiveChevraKadisha}
									/>
								</>
							)
						) : (
							<CKRegistryErrorHandler errorMessage={appContext.searchError.searchErrorMessage}/>
						)

					) : (
						<CKRegistrySingleView/>
					)
				}

			</div>
			<div className={
				appContext.isModalActive ? (
					styles['ck-registry-sidebar-col'] + ' ' + styles['ck-registry-sidebar-modal-col'] + ' ' + styles['ck-registry-sidebar-modal-col_active']
				) : (
					styles['ck-registry-sidebar-col'] + ' ' + styles['ck-registry-sidebar-modal-col']
				)
			}>
				<CKRegistryItemModal
					setModalIsActive={props.setIsModalActive}
					resetActiveChevraKadisha={props.resetActiveChevraKadisha}
				/>
			</div>

			<button className={styles['ck-registry-sidebar__hide-btn']}
					onClick={() => {
						props.setIsSidebarActive(!appContext.isSidebarActive)
					}}
			>
				<img src={resourcesUrl + "arrow_left_triangle.svg"}
					 alt="Close Sidebar"
				/>
			</button>

		</div>
	);
}

export default CKRegistrySidebar;
