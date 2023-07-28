import React from "react";

class CKRegistryErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			errorMessage: ""
		}

	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			errorMessage: error.message
		};
	}

	render() {

		if (this.state.hasError) {
			return (
				<div className="ck-registry-error"
					 style={{
						 padding: "15px"
					 }}
				>

					<h5 className="ck-registry-error__message">
						{this.state.errorMessage}
					</h5>

					<p className="ck-registry-error__caption">
						Something went wrong.
						Please refresh the page and try again.
					</p>
				</div>
			);
		} else {
			return this.props.children;
		}

	}
}

export default CKRegistryErrorBoundary;
