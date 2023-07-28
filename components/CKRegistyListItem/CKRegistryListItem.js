import React, {useContext} from "react";
import {useMediaQuery} from "react-responsive";

import styles from "./CKRegistryListItem.module.scss";
import ckRegistryContext from "../../ckRegistryContext";

const CKRegistryListItem = (props) => {

	const appContext = useContext(ckRegistryContext);
	const isMobile = useMediaQuery({maxWidth: 767});

	const listItemClickHandler = () => {

		if (!isMobile) {
			props.setIsModalActive(true);
		}

		props.setActiveChevraKadisha(props.chevraKadisha)

		if (appContext.map) {
			appContext.map.panTo({
				lat: props.chevraKadisha.location.lat,
				lng: props.chevraKadisha.location.lng
			});

			if (isMobile) {

				// For Mobile and with Opened Mobile Modal
				appContext.map.panBy(0, Math.ceil((window.screen.height / 4)) - 46);

			} else {
				appContext.map.panBy(-418, 0);
			}
		}
	}

	return (
		<li className={
			appContext.activeChevraKadisha.ckId === props.chevraKadisha.id ?
				styles['ck-registry-list-item'] + " " + styles['ck-registry-list-item_active']
				: styles['ck-registry-list-item']
		}
			onClick={listItemClickHandler}
		>
			<h5 className={styles['ck-registry-list-item__title']}>
				{props.chevraKadisha.name}
			</h5>

			<ul className={styles['ck-registry-list-item-data']}>
				<li>{props.chevraKadisha.location.country ? props.chevraKadisha.location.country : "There is no assigned country"}</li>
				<li>{props.chevraKadisha.location.state ? props.chevraKadisha.location.state : "There is no assigned state"}</li>
				<li>{props.chevraKadisha.location.city ? props.chevraKadisha.location.city : "There is no assigned city"}</li>
				<li>{props.chevraKadisha.location.address ? props.chevraKadisha.location.address : "There is no assigned address"}</li>
			</ul>
		</li>
	);
}

export default CKRegistryListItem;
