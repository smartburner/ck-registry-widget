import React, {useCallback, useContext, useEffect, useMemo, useRef} from "react";
import styles from "./CKRegistryMap.module.scss"
import {GoogleMap} from "@react-google-maps/api";
import CKRegistryContext from "../../ckRegistryContext";
import CKRegistryMapMarker from "../CKRegistryMapMarker/CKRegistryMapMarker";
import resourcesUrl from "../../utils/resourcesUrl";
import {useMediaQuery} from "react-responsive";

const CKRegistryMap = (props) => {

	//#FE8B00 - Highlighted Marker Color

	const appContext = useContext(CKRegistryContext);

	const isMobile = useMediaQuery({maxWidth: 767});

	const mapRef = useRef();
	const mapCenter = useMemo(() => ({lat: 43, lng: -80}), []);
	const mapOptions = useMemo(
		() => ({
			disableDefaultUI: true,
			clickableIcons: false,
		}), []);

	const regenerateMapBounds = (mapRef) => {

		if (mapRef.current) {

			const mapBounds = new google.maps.LatLngBounds();

			if (!appContext.isSearchOccurred) {
				if (appContext.initialChevrosKadisha.length > 0) {
					appContext.initialChevrosKadisha.forEach(chevraKadisha => {
						mapBounds.extend({
							lat: chevraKadisha.location.lat,
							lng: chevraKadisha.location.lng
						})
					});
				}
			} else if (appContext.foundChevrosKadisha.length > 0) {
				appContext.foundChevrosKadisha.forEach(chevraKadisha => {
					mapBounds.extend({
						lat: chevraKadisha.location.lat,
						lng: chevraKadisha.location.lng
					})
				});
			} else if (appContext.initialChevrosKadisha.length > 0) {
				appContext.initialChevrosKadisha.forEach(chevraKadisha => {
					mapBounds.extend({
						lat: chevraKadisha.location.lat,
						lng: chevraKadisha.location.lng
					})
				});
			}

			mapRef.current.fitBounds(mapBounds);

			if (mapRef.current.getZoom() > 15) {
				mapRef.current.setZoom(12);
			}

			// For Mobile and with Opened Mobile Modal
			if (isMobile && appContext.isMobileModalOpened) {
				mapRef.current.panBy(0, Math.ceil((window.screen.height / 4)) - 46);
			}

		}

	}

	useEffect(() => {

		regenerateMapBounds(mapRef);

	}, [appContext.initialChevrosKadisha, appContext.foundChevrosKadisha])

	// On Map Load
	const onLoad = useCallback((map) => {
		mapRef.current = map;
		props.setMapInstance(map)

		regenerateMapBounds(mapRef);

	}, [appContext.initialChevrosKadisha, appContext.foundChevrosKadisha]);

	return (
		<div className={styles['ck-registry-map']}>
			<GoogleMap
				zoom={5}
				center={mapCenter}
				options={mapOptions}
				mapContainerClassName={styles['ck-registry-map-body']}
				onLoad={onLoad}
			>
				{appContext.initialChevrosKadisha.length > 0 && (

					appContext.initialChevrosKadisha.map(chevraKadisha => {

						let isThisCKFound = false;
						appContext.foundChevrosKadisha.forEach(foundChevraKadisha => {
							if (chevraKadisha.id === foundChevraKadisha.id) {
								isThisCKFound = true;
							}
						})

						return (
							<CKRegistryMapMarker
								key={chevraKadisha.id}
								position={{
									lat: chevraKadisha.location.lat,
									lng: chevraKadisha.location.lng
								}}
								icon={
									chevraKadisha.id === appContext.activeChevraKadisha.ckId ?
										resourcesUrl + "map-icons/redMarker.svg" :
										isThisCKFound ? resourcesUrl + "map-icons/blueMarker.svg" :
											resourcesUrl + "map-icons/orangeMarker.svg"
								}
								chevraKadisha={chevraKadisha}
								setActiveChevraKadisha={props.setActiveChevraKadisha}
								setIsSidebarExists={props.setIsSidebarExists}
								setIsSidebarActive={props.setIsSidebarActive}
								setIsModalActive={props.setIsModalActive}
								setIsMobileModalOpened={props.setIsMobileModalOpened}
							/>
						);
					})

					/*
					 With Marker Cluserization
					<MarkerClusterer>
						{(clusterer) => (
							appContext.initialChevrosKadisha.map(chevraKadisha => {

								let isThisCKFound = false;
								appContext.foundChevrosKadisha.forEach(foundChevraKadisha => {
									if (chevraKadisha.id === foundChevraKadisha.id) {
										isThisCKFound = true;
									}
								})

								return (
									<CKRegistryMapMarker
										key={chevraKadisha.id}
										position={{
											lat: chevraKadisha.location.lat,
											lng: chevraKadisha.location.lng
										}}
										clusterer={clusterer}
										icon={
											chevraKadisha.id === appContext.activeChevraKadisha.ckId ?
												resourcesUrl + "map-icons/mapActiveMarkerSvg.svg" :
												isThisCKFound ? resourcesUrl + "map-icons/mapHighlitedMarkerSvg.svg" :
													resourcesUrl + "map-icons/mapMarkerSvg.svg"
										}
										chevraKadisha={chevraKadisha}
										setActiveChevraKadisha={props.setActiveChevraKadisha}
										setIsSidebarExists={props.setIsSidebarExists}
										setIsSidebarActive={props.setIsSidebarActive}
										setIsModalActive={props.setIsModalActive}
										setIsMobileModalOpened={props.setIsMobileModalOpened}
									/>
								);
							})
						)}
					</MarkerClusterer>*/

				)}

			</GoogleMap>
		</div>
	)
}

export default CKRegistryMap;
