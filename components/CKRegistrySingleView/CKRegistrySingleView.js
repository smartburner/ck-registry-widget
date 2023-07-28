import React, {useContext} from "react";
import styles from "./CKRegistrySingleView.module.scss";
import CKRegistryContext from "../../ckRegistryContext";

const CKRegistrySingleView = () => {

	const appContext = useContext(CKRegistryContext);

	return (
		<div className={styles['ck-registry-single-view']}>
			<h4 className={styles['ck-registry-single-view__title']}>
				{
					appContext.activeChevraKadisha.ckTitle.length > 0 ? appContext.activeChevraKadisha.ckTitle : "There is no title assigned"
				}
			</h4>

			<ul className={styles['ck-registry-single-view-info']}>
				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Country
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckCountry ? appContext.activeChevraKadisha.ckCountry : "There is no country assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						State
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckState ? appContext.activeChevraKadisha.ckState : "There is no state assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						City
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckCity ? appContext.activeChevraKadisha.ckCity : "There is no city assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Address
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckAddress ? appContext.activeChevraKadisha.ckAddress : "There is no address assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Serving
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckServing.length > 0 ? appContext.activeChevraKadisha.ckServing : "There is no serving assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Chevra Chairperson
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckChairpersonData.name.length > 0 ? appContext.activeChevraKadisha.ckChairpersonData.name : "There is no chairperson assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Chairperson Contacts
					</h6>
					{
						appContext.activeChevraKadisha.ckChairpersonData.contactInfoItems.length > 0 ?
							appContext.activeChevraKadisha.ckChairpersonData.contactInfoItems.map(infoItem => (
								<div
									key={appContext.activeChevraKadisha.ckId + infoItem}
									className={styles['ck-registry-single-view-info-item__value']}>
									{infoItem}
								</div>
							)) : (
								<div
									className={styles['ck-registry-single-view-info-item__value']}>
									There are no contacts
								</div>
							)
					}
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Affiliated Funeral Homes
					</h6>

					{
						appContext.activeChevraKadisha.ckAffiliatedFuneralHomes.length > 0 ?
							appContext.activeChevraKadisha.ckAffiliatedFuneralHomes.map(funeralHome => (
								<div
									key={appContext.activeChevraKadisha.ckId + funeralHome}
									className={styles['ck-registry-single-view-info-item__value']}>
									{funeralHome}
								</div>
							)) : (
								<div className={styles['ck-registry-single-view-info-item__value']}>
									There are no assigned Funeral Homes
								</div>
							)
					}

				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Men's Chevra Head
					</h6>
					<span className={styles['ck-registry-single-view-info-item__value']}>
						{appContext.activeChevraKadisha.ckMensChevraHeadData.name.length > 0 ? appContext.activeChevraKadisha.ckMensChevraHeadData.name : "There is no men's chevra head assigned"}
					</span>
				</li>

				<li className={styles['ck-registry-single-view-info-item']}>
					<h6 className={styles['ck-registry-single-view-info-item__title']}>
						Men's Chevra Head Contacts
					</h6>

					{
						appContext.activeChevraKadisha.ckMensChevraHeadData.contactInfoItems.length > 0 ?
							appContext.activeChevraKadisha.ckMensChevraHeadData.contactInfoItems.map(contactItem => (
								<div
									key={appContext.activeChevraKadisha.ckId + contactItem}
									className={styles['ck-registry-single-view-info-item__value']}>
									{contactItem}
								</div>
							)) : (
								<div className={styles['ck-registry-single-view-info-item__value']}>
									There are no contacts
								</div>
							)
					}

				</li>

			</ul>
		</div>
	)
}

export default CKRegistrySingleView;
