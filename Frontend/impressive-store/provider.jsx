import { createContext, useState } from 'react';

export let impContext = createContext(null);

export const ImpProvider = ({ children, store }) => {
    const imp = {};
    imp['set'] = {};

    for (let key in store)
    {
        const [impStore, setImpStore] = useState(store[key]);
        imp[key] = impStore;
        imp['set'][key] = setImpStore;
    }

    return (
        <impContext.Provider value={{ imp }}>
            {children}
        </impContext.Provider>
    );
};

