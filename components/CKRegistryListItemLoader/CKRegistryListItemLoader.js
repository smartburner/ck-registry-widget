import React from "react";
import ContentLoader from "react-content-loader";

const CKRegistryListItemLoader = (props) => {
	return (
		<ContentLoader
			speed={1.5}
			width={'100%'}
			height={200}
			backgroundColor="#b3b3b3"
			foregroundColor="#e0e0e0"
			{...props}
		>
			<rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
		</ContentLoader>
	)
}

export default CKRegistryListItemLoader;
