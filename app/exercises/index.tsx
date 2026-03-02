import { View, Text, StyleSheet, FlatList, useColorScheme, TouchableOpacity, TextInput } from 'react-native';
import { CheckCircle2, Search, Filter } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

const EXERCISE_DATA = [
    { id: '1', date: '2020-11-16', day: 'Pazartesi', title: 'SOL KOL Egzersizi', completed: true },
    { id: '2', date: '2020-11-16', day: 'Pazartesi', title: 'SAĞ KOL Egzersizi', completed: true },
    { id: '3', date: '2020-11-16', day: 'Pazartesi', title: 'KOLLARI ÖNE KALDIRIYORUZ Egzersizi', completed: true },
    { id: '4', date: '2020-11-16', day: 'Pazartesi', title: 'ISINMA HAREKETLERİ Egzersizi', completed: true },
    { id: '5', date: '2020-11-15', day: 'Pazar', title: 'NEFES Egzersizi', completed: true },
];

export default function ExercisesScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const renderItem = ({ item }: { item: typeof EXERCISE_DATA[0] }) => (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={[styles.statusIcon, { backgroundColor: theme.success + '15' }]}>
                <CheckCircle2 size={24} color={theme.success} />
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.dateText, { color: theme.muted }]}>
                    {item.date} {item.day}
                </Text>
                <Text style={[styles.titleText, { color: theme.text }]}>
                    {item.title} Tamamlandı.
                </Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.headerActions, { borderBottomColor: theme.border }]}>
                <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
                    <Search size={20} color={theme.muted} />
                    <TextInput
                        placeholder="Egzersiz Ara..."
                        placeholderTextColor={theme.muted}
                        style={[styles.searchInput, { color: theme.text }]}
                    />
                </View>
                <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card }]}>
                    <Filter size={20} color={theme.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={EXERCISE_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListHeaderComponent={() => (
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Tamamlanan Egzersizler</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerActions: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderRadius: 12,
        height: 45,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
    },
    filterBtn: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    statusIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    dateText: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: '500',
    },
    titleText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
});
