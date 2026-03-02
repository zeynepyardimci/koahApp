import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Droplet, Activity, Utensils, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

export default function FormsScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const formItems = [
        { title: 'Kan Şekeri İzlem', icon: Droplet, color: '#FF4D6D', href: '/blood-sugar' },
        { title: 'Fiziksel Aktivite', icon: Activity, color: '#4EA8DE', href: '/exercises' },
        { title: 'Beslenme Değerlendirme', icon: Utensils, color: '#FFB703', href: '/forms/nutrition-add' },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.content}>
                {formItems.map((item, index) => (
                    <Link key={index} href={item.href as any} asChild>
                        <TouchableOpacity
                            style={[styles.formCard, { backgroundColor: theme.card }]}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                                <item.icon size={28} color={item.color} />
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={[styles.formTitle, { color: theme.text }]}>{item.title}</Text>
                                <Text style={[styles.formSubtitle, { color: theme.muted }]}>Veri girişi yapmak için tıklayın</Text>
                            </View>
                            <ChevronRight size={20} color={theme.muted} />
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    formCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardInfo: {
        flex: 1,
    },
    formTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    formSubtitle: {
        fontSize: 13,
    },
});
