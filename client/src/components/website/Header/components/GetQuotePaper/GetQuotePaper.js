import { useTranslation } from 'react-i18next';

//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../../../assets/img/circle-shape-gray.png';

const GetQuotePaper = () => {
	const { t, i18n } = useTranslation('translations');

	return (
		<div className="get-quote-paper-container">
			<div className="left-container">
				<h1>{t('GET')}</h1>
				<h1>
					{t('A_OFFER')} <img className="circle-img" src={CircleShape} alt="" />
				</h1>
				<h1> {t('QUOTE')}</h1>
			</div>
			<div className="right-container">
				<div className="input-items">
					<div className="input-item">
						<label>{t('FIRST_NAME')} :-</label>
						<input type="text" />
					</div>
					<div className="input-item">
						<label>{t('LAST_NAME')} :-</label>
						<input type="text" />
					</div>
					<div className="input-item">
						<label>{t('EMAIL')} :-</label>
						<input type="email" style={{ textTransform: 'lowercase' }} />
					</div>
					<div className="input-item">
						<label>{t('PHONE')} :-</label>
						<input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
					</div>
					<div className="input-item">
						<label>{t('COMPANY_NAME')} :-</label>
						<input type="text" />
					</div>
					<div className="input-item">
						<label>{t('BUDGET')} :-</label>
						<input type="text" />
					</div>
					<div className="input-item">
						<label>{t('ESTIMATION')} :-</label>
						<input type="text" />
					</div>
					<div className="input-item" style={{ flexDirection: 'column', marginBottom: 20 }}>
						<label>{t('SERVICE_YOU_NEED')} :-</label>
						<textarea />
					</div>
					<div className="input-item">
						<button className="submit-btn">{t('DONE')}</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetQuotePaper;
