import { createContext, useState } from 'react';

let imp = {};

export let impContext = createContext({ imp });

export const ImpProvider = ({ children, store }) => {
    let imp = {};
    imp['set'] = {};

    for (let key in store)
    {
        const [impStore, setImpStore] = useState<any>(store[key]);
        imp[key] = impStore;
        imp['set'][key] = setImpStore;
    }

    return (
        <impContext.Provider value={{ imp }}>
            {children}
        </impContext.Provider>
    );
};



