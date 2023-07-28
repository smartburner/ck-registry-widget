import React, {useContext, useEffect, useState} from "react";
import CKRegistrySearchInput from "../CKRegistrySearchInput/CKRegistrySearchInput";
import {useMediaQuery} from "react-responsive";
import ckRegistryContext from "../../ckRegistryContext";

import styles from "./CKRegistrySearchForm.module.scss";
import CKRegistrySearchFormLoader from "../CKRegistrySearchFormLoader/CKRegistrySearchFormLoader";

let suggestionsList = [];

const CKRegistrySearchForm = (props) => {

	const appContext = useContext(ckRegistryContext);

	const isMobile = useMediaQuery({maxWidth: 767});

	const [searchInputState, setSearchInputState] = useState({
		suggestions: [],
		value: '',
		inputPlaceholder: 'Start typing here to find the CK...',
		errorMessage: "",
		isLoading: false
	});

	// Loading Search Tips
	useEffect(() => {

		const searchTipsAutoloadNonce = CK_REGISTRY_NONCES.searchTipsAutoloadNonce;

		if (searchTipsAutoloadNonce) {
			let requestBody = new FormData();

			requestBody.append('action', 'nasckGetSearchTips');
			requestBody.append('searchTipsAutoloadNonce', searchTipsAutoloadNonce);

			setSearchInputState((prevState) => ({
				...prevState,
				isLoading: true,
				inputPlaceholder: 'Loading...',
			}));

			fetch('/wp-admin/admin-ajax.php', {
				method: 'POST',
				body: requestBody
			}).then(response => {
				return response.json();
			}).then(response => {

				if (response.success) {

					suggestionsList = response.data;

					setSearchInputState(prevState => ({
						...prevState,
						isLoading: false,
						inputPlaceholder: 'Start typing here to find the CK...'
					}));

				} else {
					// TODO: Implement Error Handling
					setSearchInputState(prevState => ({
						...prevState,
						isLoading: false,
						inputPlaceholder: response.data.message,
					}));
				}

			}).catch(error => {
				setSearchInputState(prevState => ({
					...prevState,
					isLoading: false,
					inputPlaceholder: error.message,
				}));
			});

		}

	}, []);

	const makeFilteringRequest = (isOnFormReset = false, isOnSuggestionSelect = false, suggestionValue = null, event = null) => {

		// Creating Filtering Request here
		const getCKsDataNonce = CK_REGISTRY_NONCES.getCKsDataNonce;

		if (getCKsDataNonce) {

			// Checking if the Modal is Active and Hiding it
			if (appContext.isModalActive) {
				props.setIsModalActive(false);
				props.resetActiveChevraKadisha();
			}

			// Creating RequestBody
			let requestBody;

			if (isOnSuggestionSelect || isOnFormReset) {
				requestBody = new FormData();

				if (suggestionValue) {
					requestBody.append("searchStr", suggestionValue);
				}

			} else {
				// If it is the Request from the Form
				requestBody = new FormData(event.target);
			}

			requestBody.append('action', 'getCKsData');
			requestBody.append('getCKsDataNonce', getCKsDataNonce);

			// Enabling Loading State
			setSearchInputState(prevState => ({
				...prevState,
				isLoading: true,
				inputPlaceholder: 'Loading...'
			}));
			props.setSearchResultsIsLoading(true);

			fetch('/wp-admin/admin-ajax.php', {
				method: "POST",
				body: requestBody
			}).then(response => {
				return response.json();
			}).then(response => {

				if (response.success) {

					// Removing search error if it was
					if (appContext.searchError.isSearchError) {
						props.setSearchError(false);
					}

					if (!isOnFormReset) {
						props.setFoundChevrosKadisha(response.data);
					} else {

						// Resetting Chevra Kadisha list
						props.setFoundChevrosKadisha();

					}

				} else {

					// Resetting Chevra Kadisha list
					props.setFoundChevrosKadisha();

					// Setting Search Error
					props.setSearchError(true, response.data.message);

				}

				// Disabling Loading State
				setSearchInputState(prevState => ({
					...prevState,
					isLoading: false,
					inputPlaceholder: 'Start typing here to find the CK...'
				}));
				props.setSearchResultsIsLoading(false);

				// If isOnFormReset - then hiding the Sidebar,
				// Else - Showing it
				if (isOnFormReset) {
					props.setIsSearchOccurred(false);

					if (isMobile) {
						props.setIsMobileModalOpened(false);
					} else {
						props.setIsSidebarExists(false);
						props.setIsSidebarActive(false);
					}

				} else {

					// Search is Occured
					props.setIsSearchOccurred(true);

					if (isMobile) {
						props.setIsMobileModalOpened(true);
					} else {
						props.setIsSidebarExists(true);
						props.setIsSidebarActive(true);
					}

				}

			}).catch(error => {

				props.setSearchError(true, error.message);
				props.setIsSearchOccurred(true);
				props.setIsSidebarExists(true);
				props.setIsSidebarActive(true);

			});
		}

	}

	const onSearchInputChange = (event, {newValue}) => {
		setSearchInputState((oldState) => ({
			...oldState,
			value: newValue
		}));
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	const onSuggestionsClearRequested = () => {
		setSearchInputState((oldState) => ({
			...oldState,
			suggestions: []
		}));
	};

	// Teach Autosuggest how to calculate suggestions for any given input value.
	const getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		const resultsNumber = 5;

		if (inputLength !== 0) {
			return suggestionsList.filter(suggestion =>
				suggestion.toLowerCase().includes(inputValue)
			).slice(0, resultsNumber);
		} else {
			return [];
		}

	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	const onSuggestionsFetchRequested = ({value}) => {
		setSearchInputState((oldState) => ({
			...oldState,
			suggestions: getSuggestions(value)
		}));
	};

	const onSuggestionSelected = (event, {suggestionValue}) => {
		makeFilteringRequest(false, true, suggestionValue);
	}

	//////////////////////////////////////////////////////

	const formSubmitHandler = (event) => {
		event.preventDefault();
		makeFilteringRequest(false, false, null, event);
	}

	const formResetHandler = (event) => {
		event.preventDefault();
		makeFilteringRequest(true);

		setSearchInputState(prevState => ({
			...prevState,
			value: ''
		}));

	}

	return (
		<form
			className={styles['ck-registry-search']}
			onSubmit={event => formSubmitHandler(event)}
			onReset={event => formResetHandler(event)}
		>
			{searchInputState.isLoading ? (
				<CKRegistrySearchFormLoader/>
			) : (
				<CKRegistrySearchInput
					onSuggestionSelected={onSuggestionSelected}
					inputPlaceHolder={searchInputState.inputPlaceholder}
					inputValue={searchInputState.value}
					isLoading={searchInputState.isLoading}
					suggestions={searchInputState.suggestions}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					onChange={onSearchInputChange}
				/>
			)}

		</form>
	)
}

export default CKRegistrySearchForm;
