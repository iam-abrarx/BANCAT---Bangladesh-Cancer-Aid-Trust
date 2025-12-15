import { createContext, useContext, useState, type ReactNode } from 'react';

interface DonationDrawerContextType {
    isOpen: boolean;
    openDrawer: (data?: { amount?: number; type?: string; campaignId?: number; programId?: number; patientId?: number }) => void;
    closeDrawer: () => void;
    initialData?: { amount?: number; type?: string; campaignId?: number; programId?: number; patientId?: number };
}

const DonationDrawerContext = createContext<DonationDrawerContextType | undefined>(undefined);

export const DonationDrawerProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [initialData, setInitialData] = useState<{ amount?: number; type?: string; campaignId?: number; programId?: number; patientId?: number } | undefined>();

    const openDrawer = (data?: { amount?: number; type?: string; campaignId?: number; programId?: number; patientId?: number }) => {
        setInitialData(data);
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
        setInitialData(undefined);
    };

    return (
        <DonationDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, initialData }}>
            {children}
        </DonationDrawerContext.Provider>
    );
};

export const useDonationDrawer = () => {
    const context = useContext(DonationDrawerContext);
    if (!context) {
        throw new Error('useDonationDrawer must be used within DonationDrawerProvider');
    }
    return context;
};
