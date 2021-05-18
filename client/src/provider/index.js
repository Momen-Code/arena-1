import { useState, useContext, createContext } from 'react';

const AppContext = createContext(null);
const QuoteContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useQuoteContext = () => useContext(QuoteContext);

export const AppProvider = ({ children }) => {
	const [quoteActive, setQuoteActive] = useState(false);

	return (
		<AppContext.Provider value={{}}>
			<QuoteContext.Provider value={{ quoteActive, setQuoteActive }}>{children}</QuoteContext.Provider>)
		</AppContext.Provider>
	);
};
