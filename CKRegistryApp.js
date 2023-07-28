import React, {useEffect, useState} from "react";
import CKRegistryMap from "./components/CKRegistryMap/CKRegistryMap";
import {useLoadScript} from "@react-google-maps/api";
import CKRegistryContext from "./ckRegistryContext";
import CKRegistrySearchForm from "./components/CKRegistrySearchForm/CKRegistrySearchForm";
import {useMediaQuery} from "react-responsive";

import styles from "./CKRegistryApp.module.scss";
import CKRegistrySidebar from "./components/CKRegistrySidebar/CKRegistrySidebar";
import CKRegistryErrorBoundary from "./components/CKRegistryErrorBoundary/CKRegistryErrorBoundary";
import CKRegistryErrorHandler from "./components/CKRegistryErrorHandler/CKRegistryErrorHandler";
import CKRegistryMobileModal from "./components/CKRegistryMobileModal/CKRegistryMobileModal";
import CKRegistryList from "./components/CKRegistryList/CKRegistryList";
import CKRegistrySingleView from "./components/CKRegistrySingleView/CKRegistrySingleView";
import CKRegistryAppLoader from "./components/CKRegistryAppLoader/CKRegistryAppLoader";
import CKRegistryListItemLoader from "./components/CKRegistryListItemLoader/CKRegistryListItemLoader";

const CKRegistryApp = () => {

	const {isLoaded, loadError: mapLoadError} = useLoadScript({
		googleMapsApiKey: "here_will_be_the_key"
	});

	const isMobile = useMediaQuery({maxWidth: 767});

	const [appState, setAppState] = useState({
		map: null,
		initialChevrosKadisha: [],
		foundChevrosKadisha: [],
		isLoading: !isLoaded,
		searchResultsIsLoading: false, // For the List Of Results
		globalAppError: {
			isError: false,
			errorMessage: ""
		},
		searchError: {
			isSearchError: false,
			searchErrorMessage: ""
		},
		isSearchOccurred: false,
		isSidebarExists: false,
		isSidebarActive: false,
		isModalActive: false,

		isMobileModalOpened: false,

		activeChevraKadisha: {
			ckId: -1,
			ckTitle: "",
			ckCountry: "",
			ckState: "",
			ckCity: "",
			ckAddress: "",
			ckServing: "",
			ckChairpersonData: {
				name: "",
				contactInfoItems: []
			},
			ckAffiliatedFuneralHomes: [],
			ckMensChevraHeadData: {
				name: "",
				contactInfoItems: []
			},
			ckWomenChevraHeadData: {
				name: "",
				contactInfoItems: []
			},
			ckWebsiteURL: ""
		}
	});

	const setMapInstance = (map) => {
		setAppState(prevState => ({
			...prevState,
			map: map
		}))
	}

	const setSearchResultsIsLoading = (searchResultsIsLoading = false) => {
		setAppState(prevState => ({
			...prevState,
			searchResultsIsLoading: searchResultsIsLoading
		}))
	}

	const setSearchError = (isError = false, errorMessage = "") => {
		setAppState(prevState => ({
			...prevState,
			searchError: {
				isSearchError: isError,
				searchErrorMessage: errorMessage
			}
		}));
	}

	// Sets Active Chevra Kadisha (using on Marker Click)
	const setActiveChevraKadisha = (activeCKData = {}) => {
		setAppState(prevState => ({
			...prevState,
			activeChevraKadisha: {
				ckId: activeCKData.id,
				ckTitle: activeCKData.name,
				ckCountry: activeCKData.location.country,
				ckState: activeCKData.location.state,
				ckCity: activeCKData.location.city,
				ckAddress: activeCKData.location.address,
				ckServing: activeCKData.serving,
				ckChairpersonData: {
					name: activeCKData.chevraChairpersonData.chairperson_name,
					contactInfoItems: activeCKData.chevraChairpersonData.chairperson_contact_info.length > 0 ? activeCKData.chevraChairpersonData.chairperson_contact_info.map(item => {
						return item.chairperson_contact_info_item
					}) : []
				},
				ckAffiliatedFuneralHomes: activeCKData.affiliatedFuneralHomes.length > 0 ? activeCKData.affiliatedFuneralHomes.map(funeralHome => {
					return funeralHome.funeral_home
				}) : [],
				ckMensChevraHeadData: {
					name: activeCKData.mensChevraHeadData.mens_chevra_head_name,
					contactInfoItems: activeCKData.mensChevraHeadData.mens_chevra_head_contact_info.length > 0 ? activeCKData.mensChevraHeadData.mens_chevra_head_contact_info.map(item => {
						return item.contact_info_item;
					}) : []
				}
			}
		}));
	}

	// TODO: Refactor it later (join with setActiveChevraKadisha above)
	const resetActiveChevraKadisha = () => {
		setAppState(prevState => ({
			...prevState,
			activeChevraKadisha: {
				ckId: -1,
				ckTitle: "",
				ckCountry: "",
				ckState: "",
				ckCity: "",
				ckAddress: "",
				ckServing: "",
				ckChairpersonData: {
					name: "",
					contactInfoItems: []
				},
				ckAffiliatedFuneralHomes: [],
				ckMensChevraHeadData: {
					name: "",
					contactInfoItems: []
				},
				ckWomenChevraHeadData: {
					name: "",
					contactInfoItems: []
				},
				ckWebsiteURL: ""
			}
		}))
	}

	const setIsSidebarActive = (isSidebarActive) => {
		setAppState(prevState => ({
			...prevState,
			isSidebarActive: isSidebarActive
		}))
	}

	const setIsModalActive = (isModalActive) => {
		setAppState(prevState => ({
			...prevState,
			isModalActive: isModalActive
		}))
	}

	const setIsMobileModalOpened = (isMobileModalOpened = false) => {
		setAppState(prevState => ({
			...prevState,
			isMobileModalOpened: isMobileModalOpened
		}))
	}

	const setInitialChevrosKadisha = (initialChevrosKadisha = []) => {
		setAppState((prevState) => ({
			...prevState,
			isLoading: false,
			initialChevrosKadisha: initialChevrosKadisha
		}));
	}

	const setFoundChevrosKadisha = (foundChevrosKadisha = []) => {
		setAppState((prevState) => ({
			...prevState,
			isLoading: false,
			foundChevrosKadisha: foundChevrosKadisha
		}));
	}

	// Initial Loading of the Chevros Kadisha (initial ChevrosKadisha)
	useEffect(() => {

		if (isLoaded) {
			const requestBody = new FormData();
			requestBody.append('action', 'getCKsData');
			requestBody.append('getCKsDataNonce', CK_REGISTRY_NONCES.getCKsDataNonce);

			setAppState((prevState) => ({
				...prevState,
				isLoading: true
			}));

			fetch('/wp-admin/admin-ajax.php', {
				method: 'POST',
				body: requestBody
			}).then(response => {

				return response.json();

			}).then(response => {

				if (response.success) {

					setInitialChevrosKadisha(response.data)

				} else {

					setAppState((prevState) => ({
						...prevState,
						isLoading: false,
						globalAppError: {
							isError: true,
							errorMessage: response.data.message
						}
					}));
				}

			}).catch(error => {

				setAppState((prevState) => ({
					...prevState,
					isLoading: false,
					globalAppError: {
						isError: true,
						errorMessage: error.message
					}
				}));

			});
		}
	}, [isLoaded]);

	const setIsSearchOccurred = isSearchOccurred => {
		setAppState(prevState => ({
			...prevState,
			isSearchOccurred: isSearchOccurred
		}))
	}

	const setIsSidebarExists = (isSidebarExists = false) => {
		setAppState(prevState => ({
			...prevState,
			isSidebarExists: isSidebarExists
		}));
	}

	return (
		<div className={
			!appState.globalAppError.isError ? styles['ck-registry-body'] : styles['ck-registry-body'] + " " + styles['ck-registry-body_is-error']
		}>

			{
				!mapLoadError ? (
					<CKRegistryErrorBoundary>
						{appState.isLoading ? (
							<CKRegistryAppLoader/>
						) : (
							<CKRegistryContext.Provider value={appState}>
								{
									!appState.globalAppError.isError ? (
										<>
											<CKRegistrySearchForm
												setIsSearchOccurred={setIsSearchOccurred}
												setIsSidebarExists={setIsSidebarExists}
												setFoundChevrosKadisha={setFoundChevrosKadisha}
												setIsSidebarActive={setIsSidebarActive}
												setIsModalActive={setIsModalActive}
												resetActiveChevraKadisha={resetActiveChevraKadisha}
												setSearchError={setSearchError}
												setIsMobileModalOpened={setIsMobileModalOpened}
												setSearchResultsIsLoading={setSearchResultsIsLoading}
											/>

											{(appState.isSidebarExists && !isMobile) && (
												<CKRegistrySidebar
													setIsSidebarActive={setIsSidebarActive}
													setIsModalActive={setIsModalActive}
													setActiveChevraKadisha={setActiveChevraKadisha}
													resetActiveChevraKadisha={resetActiveChevraKadisha}
												/>
											)}

											{isMobile && (
												<CKRegistryMobileModal
													setIsMobileModalOpened={setIsMobileModalOpened}
													resetActiveChevraKadisha={resetActiveChevraKadisha}
												>
													{
														appState.isSearchOccurred && appState.activeChevraKadisha.ckId === -1 ? (
															appState.searchResultsIsLoading ? (
																<CKRegistryListItemLoader/>
															) : (
																<>
																	<h3 className={styles['ck-registry-mobile-headline']}>Results based on current search:</h3>
																	<CKRegistryList
																		setIsModalActive={setIsModalActive}
																		setActiveChevraKadisha={setActiveChevraKadisha}
																	/>
																</>
															)
														) : (
															<CKRegistrySingleView/>
														)
													}
												</CKRegistryMobileModal>
											)}

											<CKRegistryMap
												setIsMobileModalOpened={setIsMobileModalOpened}
												setActiveChevraKadisha={setActiveChevraKadisha}
												setIsSidebarExists={setIsSidebarExists}
												setIsSidebarActive={setIsSidebarActive}
												setIsModalActive={setIsModalActive}
												setMapInstance={setMapInstance}
											/>
										</>
									) : (
										<CKRegistryErrorHandler errorMessage={appState.globalAppError.errorMessage}/>
									)
								}
							</CKRegistryContext.Provider>
						)}
					</CKRegistryErrorBoundary>
				) : (
					<CKRegistryErrorHandler errorMessage={mapLoadError.message}/>
				)
			}

		</div>
	);
}

export default CKRegistryApp;
