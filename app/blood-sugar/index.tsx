import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Modal } from 'react-native';
import { Droplet, Clock, Calendar, UtensilsCrossed, AlertTriangle, X } from 'lucide-react-native';
import { useState } from 'react';
import { Colors } from '../../constants/Colors';

const LOGS = [
    {
        id: '1',
        meal: 'Sabah',
        state: 'Açlık',
        date: '05-03-2023',
        time: '16:58:00',
        value: 60,
        insulin: '-'
    },
];

export default function BloodSugarScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const [showAlert, setShowAlert] = useState(false);

    const renderLog = (log: typeof LOGS[0]) => {
        const isLow = log.value < 70;

        return (
            <View key={log.id} style={[styles.logCard, { backgroundColor: theme.card }]}>
                <View style={styles.logHeader}>
                    <View style={styles.mealBadge}>
                        <UtensilsCrossed size={14} color={theme.secondary} />
                        <Text style={[styles.mealText, { color: theme.secondary }]}>{log.meal} - {log.state}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowAlert(isLow)}>
                        <AlertTriangle size={20} color={isLow ? theme.danger : theme.muted} />
                    </TouchableOpacity>
                </View>

                <View style={styles.logGrid}>
                    <View style={styles.logItem}>
                        <Calendar size={16} color={theme.muted} />
                        <Text style={[styles.logValue, { color: theme.text }]}>{log.date}</Text>
                    </View>
                    <View style={styles.logItem}>
                        <Clock size={16} color={theme.muted} />
                        <Text style={[styles.logValue, { color: theme.text }]}>{log.time}</Text>
                    </View>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.valueRow}>
                    <View>
                        <Text style={[styles.label, { color: theme.muted }]}>Kan Şekeri</Text>
                        <View style={styles.valueContainer}>
                            <Text style={[styles.mainValue, { color: isLow ? theme.danger : theme.text }]}>{log.value}</Text>
                            <Text style={[styles.unit, { color: theme.muted }]}>mg/dL</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.label, { color: theme.muted }]}>İnsülin Dozu</Text>
                        <Text style={[styles.mainValue, { color: theme.text }]}>{log.insulin}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Text style={[styles.dateHeader, { color: theme.text }]}>05-03-2023</Text>
                    <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary }]}>
                        <Text style={styles.addBtnText}>Ekle</Text>
                    </TouchableOpacity>
                </View>

                {LOGS.map(renderLog)}
            </ScrollView>

            {/* Warning Alert Modal */}
            <Modal visible={showAlert} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                        <View style={[styles.warningIcon, { backgroundColor: theme.danger + '20' }]}>
                            <AlertTriangle size={40} color={theme.danger} />
                        </View>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>UYARI: Düşük Şeker</Text>
                        <Text style={[styles.modalText, { color: theme.muted }]}>
                            Lütfen 4-5 kesme şeker veya 150-200 ml meyve suyu alınız. Ardından ek bir ara öğün alınız.
                            15 dakika sonra kan şekerine bakınız.
                        </Text>
                        <TouchableOpacity
                            style={[styles.closeBtn, { backgroundColor: theme.danger }]}
                            onPress={() => setShowAlert(false)}
                        >
                            <Text style={styles.closeBtnText}>Anladım</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    addBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logCard: {
        padding: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    mealBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(230, 57, 70, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    mealText: {
        marginLeft: 6,
        fontSize: 12,
        fontWeight: 'bold',
    },
    logGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    logItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    logValue: {
        fontSize: 14,
    },
    divider: {
        height: 1,
        marginBottom: 16,
    },
    valueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    mainValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    unit: {
        fontSize: 12,
        marginLeft: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    modalContent: {
        width: '100%',
        padding: 24,
        borderRadius: 25,
        alignItems: 'center',
    },
    warningIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    modalText: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    closeBtn: {
        width: '100%',
        padding: 16,
        borderRadius: 15,
        alignItems: 'center',
    },
    closeBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
