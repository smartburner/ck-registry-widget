import React, {useContext} from "react";
import Autosuggest from 'react-autosuggest';
import resourcesUrl from "../../utils/resourcesUrl";
import ckRegistryContext from "../../ckRegistryContext";
import styles from "./CKRegistrySearchInput.module.scss";

const CKRegistrySearchInput = (props) => {

	const appContext = useContext(ckRegistryContext);

	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	const getSuggestionValue = (suggestion) => {
		return suggestion;
	}

	// Use your imagination to render suggestions.
	const renderSuggestion = (suggestion, {query}) => {

		const subStrIndex = suggestion.toLowerCase().indexOf(query.toLowerCase());

		return (
			<div>
				{suggestion.substring(0, subStrIndex)}
				<mark className={styles['ck-registry-search__sug-mark']}>
					{suggestion.substring(subStrIndex, subStrIndex + query.length)}
				</mark>
				{suggestion.substring(subStrIndex + query.length)}
			</div>
		);
	}

	// Autosuggest will pass through all these props to the input.
	const inputProps = {
		placeholder: props.inputPlaceHolder,
		value: props.inputValue,
		onChange: props.onChange,
		disabled: props.isLoading || appContext.isLoading,
		name: "searchStr"
	};

	return (

		<Autosuggest
			theme={styles}
			suggestions={props.suggestions}
			onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
			onSuggestionsClearRequested={props.onSuggestionsClearRequested}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={inputProps}
			onSuggestionSelected={props.onSuggestionSelected}
			renderInputComponent={
				inputProps => (
					<div className={styles['ck-registry-search-input-group']}>
						<input
							{...inputProps}
						/>
						<button
							type={!appContext.isSearchOccurred ? "submit" : "reset"}
							className={styles['ck-registry-search__submit']}
							disabled={props.isLoading}
						>
							{
								!appContext.isSearchOccurred ? (
									<img src={resourcesUrl + "search-icon.svg"} alt="Search"/>
								) : (
									<img src={resourcesUrl + "close-icon.svg"} alt="Reset Search"/>
								)
							}
						</button>
					</div>
				)
			}

		/>
	);
}

export default CKRegistrySearchInput;
