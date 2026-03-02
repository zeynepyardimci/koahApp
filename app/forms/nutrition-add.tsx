import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, TextInput } from 'react-native';
import { ChevronDown, ArrowRight, Save, Info } from 'lucide-react-native';
import { useState } from 'react';
import { Colors } from '../../constants/Colors';

export default function NutritionAddScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [form, setForm] = useState({
        week: 'Gebelik Haftasını Seçiniz',
        meal: 'Sabah',
        food: 'Ayran',
        amount: ''
    });

    const selectedFood = {
        name: 'Ayran',
        calories: '114 cal / 300 Cc',
        unit: 'Cc',
        description: '1,5 su bardağı = 300 ml'
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.formSection}>
                <Text style={[styles.label, { color: theme.muted }]}>Gebelik Haftasını Seçiniz:</Text>
                <TouchableOpacity style={[styles.picker, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Text style={[styles.pickerText, { color: theme.text }]}>{form.week}</Text>
                    <ChevronDown size={20} color={theme.muted} />
                </TouchableOpacity>

                <Text style={[styles.label, { color: theme.muted }]}>Öğünü Seçiniz:</Text>
                <TouchableOpacity style={[styles.picker, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Text style={[styles.pickerText, { color: theme.text }]}>{form.meal}</Text>
                    <ChevronDown size={20} color={theme.muted} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F3722C' }]}>
                    <Text style={styles.actionBtnText}>Besin Seçimine Git</Text>
                    <ArrowRight size={20} color="#fff" />
                </TouchableOpacity>

                <Text style={[styles.calorieFooter, { color: theme.muted }]}>
                    Besinlerden Alınan Toplam Kalori: <Text style={{ color: theme.primary, fontWeight: 'bold' }}>80.50 cal</Text>
                </Text>
            </View>

            <View style={[styles.selectionCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Besin Ekleme</Text>

                <TouchableOpacity style={[styles.picker, { backgroundColor: theme.background, borderColor: theme.border }]}>
                    <Text style={[styles.pickerText, { color: theme.text }]}>{form.food}</Text>
                    <ChevronDown size={20} color={theme.muted} />
                </TouchableOpacity>

                <View style={styles.foodDetails}>
                    {[
                        { label: 'Besin Adı:', val: selectedFood.name },
                        { label: 'Kalorisi:', val: selectedFood.calories },
                        { label: 'Ölçüm Birimi:', val: selectedFood.unit },
                        { label: 'Ölçüm Açıklaması:', val: selectedFood.description },
                    ].map((item, i) => (
                        <View key={i} style={styles.detailRow}>
                            <Text style={[styles.detailLabel, { color: theme.muted }]}>{item.label}</Text>
                            <Text style={[styles.detailValue, { color: theme.text }]}>{item.val}</Text>
                        </View>
                    ))}
                </View>

                <TextInput
                    placeholder="Besin miktarını giriniz(Cc)"
                    placeholderTextColor={theme.muted}
                    keyboardType="numeric"
                    style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                    value={form.amount}
                    onChangeText={(val) => setForm({ ...form, amount: val })}
                />

                <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
                    <Save size={20} color="#fff" />
                    <Text style={styles.saveBtnText}>Listeye Kaydet</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formSection: {
        padding: 20,
        gap: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
    },
    picker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
    },
    pickerText: {
        fontSize: 15,
    },
    actionBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 15,
        marginTop: 10,
        gap: 10,
    },
    actionBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    calorieFooter: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
    },
    selectionCard: {
        margin: 20,
        padding: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    foodDetails: {
        marginVertical: 20,
        gap: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    detailLabel: {
        fontSize: 13,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '600',
    },
    input: {
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        fontSize: 15,
        marginBottom: 20,
    },
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 15,
        gap: 10,
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
