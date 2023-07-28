import React from "react";

const CKRegistryContext = React.createContext({
	map: null,
	initialChevrosKadisha: [],
	foundChevrosKadisha: [],
	isLoading: false,
	searchResultsIsLoading: false, // For the List Of Results
	globalAppError: {
		isError: false,
		errorMessage: "",
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

export default CKRegistryContext;
