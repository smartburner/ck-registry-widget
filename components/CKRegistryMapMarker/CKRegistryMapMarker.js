import React, {useContext} from "react";
import {Marker, useGoogleMap} from "@react-google-maps/api";
import {useMediaQuery} from "react-responsive";
import CKRegistryContext from "../../ckRegistryContext";

const CKRegistryMapMarker = (props) => {

	const appContext = useContext(CKRegistryContext);
	const map = useGoogleMap();

	const isMobile = useMediaQuery({maxWidth: 767});

	const markerClickHandler = (chevraKadisha) => {

		/**
		 * 1. Changing the color of the Clicked Pin Icon
		 * 2. Resetting the color of other, non-clicked icons
		 * 3. Change the Active CK in the App Context
		 * 4. Open the Sidebar or Modal Window depending on if isSearchOccurred
		 */

		props.setActiveChevraKadisha(chevraKadisha);

		if (appContext.isSearchOccurred) {

			if (isMobile) {

				// Opening Mobile Modal
				props.setIsMobileModalOpened(true);

			} else {
				props.setIsModalActive(true);
			}

		} else {

			if (isMobile) {

				// Opening Mobile Modal
				props.setIsMobileModalOpened(true);

			} else {
				props.setIsSidebarExists(true);
				props.setIsSidebarActive(true);
			}

		}

		if (map) {

			// Panning to the Marker Position
			map.panTo(props.position);

			// For Mobile and with Opened Mobile Modal
			if (isMobile) {
				map.panBy( 0, Math.ceil((window.screen.height / 4)) - 46);
			}

			if (appContext.isSearchOccurred && appContext.isSidebarActive && !isMobile) {
				map.panBy(-418, 0);
			}
		}
	}

	return (
		<Marker
			position={props.position}
			icon={props.icon}
			animation={google.maps.Animation.DROP}
			clusterer={props.clusterer}
			onClick={() => markerClickHandler(props.chevraKadisha)}
		/>
	);
}

export default CKRegistryMapMarker;
