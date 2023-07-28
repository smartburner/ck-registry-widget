import React, {useContext} from "react";
import CKRegistryListItem from "../CKRegistyListItem/CKRegistryListItem";

import styles from "./CKRegistryList.module.scss";
import ckRegistryContext from "../../ckRegistryContext";

const CKRegistryList = (props) => {

	const appContext = useContext(ckRegistryContext);

	return (
		<ul className={styles['ck-registry-list']}>
			{
				appContext.foundChevrosKadisha.map(chevraKadisha => (
					<CKRegistryListItem
						key={chevraKadisha.id}
						chevraKadisha={chevraKadisha}
						setIsModalActive={props.setIsModalActive}
						setActiveChevraKadisha={props.setActiveChevraKadisha}
					/>
				))
			}
		</ul>
	)
}

export default CKRegistryList;
