import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BloodSugarLog = {
    id: string;
    value: number;
    mealPeriod: string;
    date: string;
    time: string;
    hasSymptoms: boolean;
    notes: string;
    status: 'LOW' | 'IN RANGE' | 'HIGH';
};

export type ActivityLog = {
    id: string;
    type: string;
    duration: number;
    intensity: string;
    date: string;
};

type AppContextType = {
    user: { name: string; condition: string; memberSince: string };
    bloodSugarLogs: BloodSugarLog[];
    activityLogs: ActivityLog[];
    goals: {
        steps: { current: number; target: number };
        activeMin: { current: number; target: number };
        weight: { current: number; target: number };
        water: { current: number; target: number };
        hba1c: { current: number; target: number };
        dailyGoals: { completed: number; total: number };
    };
    addBloodSugarLog: (log: Omit<BloodSugarLog, 'id' | 'status'>) => void;
    addActivityLog: (log: Omit<ActivityLog, 'id'>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const getStatus = (value: number): BloodSugarLog['status'] => {
    if (value < 70) return 'LOW';
    if (value <= 130) return 'IN RANGE';
    return 'HIGH';
};

export function AppProvider({ children }: { children: ReactNode }) {
    const [bloodSugarLogs, setBloodSugarLogs] = useState<BloodSugarLog[]>([
        { id: '1', value: 120, mealPeriod: 'Pre-Breakfast', date: 'TODAY', time: '08:15 AM', hasSymptoms: false, notes: '', status: 'IN RANGE' },
        { id: '2', value: 165, mealPeriod: 'Post-Lunch', date: 'TODAY', time: '01:45 PM', hasSymptoms: false, notes: '', status: 'HIGH' },
        { id: '3', value: 68, mealPeriod: 'Before Bed', date: 'YESTERDAY', time: '10:30 PM', hasSymptoms: true, notes: 'Felt dizzy', status: 'LOW' },
        { id: '4', value: 115, mealPeriod: 'After Dinner', date: 'YESTERDAY', time: '07:20 PM', hasSymptoms: false, notes: '', status: 'IN RANGE' },
    ]);

    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

    const [goals] = useState({
        steps: { current: 7500, target: 10000 },
        activeMin: { current: 18, target: 30 },
        weight: { current: 72, target: 65 },
        water: { current: 1.5, target: 2.5 },
        hba1c: { current: 6.8, target: 6.5 },
        dailyGoals: { completed: 3, total: 5 },
    });

    const addBloodSugarLog = (log: Omit<BloodSugarLog, 'id' | 'status'>) => {
        const newLog: BloodSugarLog = {
            ...log,
            id: Date.now().toString(),
            status: getStatus(log.value),
        };
        setBloodSugarLogs(prev => [newLog, ...prev]);
    };

    const addActivityLog = (log: Omit<ActivityLog, 'id'>) => {
        setActivityLogs(prev => [{ ...log, id: Date.now().toString() }, ...prev]);
    };

    return (
        <AppContext.Provider value={{ user: { name: 'Sibel KARAKOÇ', condition: 'Tip 2 Diyabet', memberSince: 'Oca 2022' }, bloodSugarLogs, activityLogs, goals, addBloodSugarLog, addActivityLog }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
