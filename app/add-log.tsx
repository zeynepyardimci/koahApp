import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, SafeAreaView,
    StatusBar, TouchableOpacity, TextInput, Switch, Keyboard, TouchableWithoutFeedback, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { X, Check, Save } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

const PRIMARY = '#E8562A';
const TEAL = '#2AC4B3';

const MEAL_PERIODS = ['Pre-Breakfast', 'Post-Breakfast', 'Pre-Lunch', 'Post-Lunch'];
const MIN_VAL = 40;
const MAX_VAL = 400;

export default function AddLogScreen() {
    const router = useRouter();
    const { addBloodSugarLog } = useApp();
    const [value, setValue] = useState(115);
    const [mealPeriod, setMealPeriod] = useState('Pre-Breakfast');
    const [hasSymptoms, setHasSymptoms] = useState(false);
    const [notes, setNotes] = useState('');

    const pct = ((value - MIN_VAL) / (MAX_VAL - MIN_VAL)) * 100;
    const getColor = () => value < 70 ? '#F4A522' : value <= 130 ? TEAL : PRIMARY;
    const getZone = () => value < 70 ? 'DÜŞÜK' : value <= 130 ? 'NORMAL (80-130)' : 'YÜKSEK';

    const handleSave = () => {
        addBloodSugarLog({
            value,
            mealPeriod,
            date: 'TODAY',
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            hasSymptoms,
            notes,
        });
        Alert.alert('✓ Kaydedildi', 'Kan şekeri değeriniz başarıyla kaydedildi.');
        router.back();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <X size={22} color="#1A1C1E" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Kayıt Ekle</Text>
                    <TouchableOpacity onPress={handleSave} style={[styles.iconBtn, { backgroundColor: PRIMARY }]}>
                        <Check size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
                    {/* Value Display */}
                    <View style={styles.valueDisplay}>
                        <Text style={styles.valueLabel}>MEVCUT DEĞER</Text>
                        <Text style={[styles.bigValue, { color: getColor() }]}>{value} <Text style={styles.unit}>mg/dL</Text></Text>
                    </View>

                    {/* Bar Slider */}
                    <View style={styles.barSlider}>
                        {Array.from({ length: 11 }).map((_, i) => {
                            const barVal = MIN_VAL + (i / 10) * (MAX_VAL - MIN_VAL);
                            const isActive = i / 10 <= (value - MIN_VAL) / (MAX_VAL - MIN_VAL);
                            return (
                                <TouchableOpacity key={i} onPress={() => setValue(Math.round(barVal))} style={[styles.bar, { backgroundColor: isActive ? getColor() : '#E0E0E0', opacity: isActive ? 1 : 0.4 }]} />
                            );
                        })}
                    </View>
                    <View style={styles.sliderRow}>
                        {[20, 50, 100, 150, 200, 250, 300, 350, 400].map(v => (
                            <TouchableOpacity key={v} onPress={() => setValue(v)}>
                                <View style={[styles.sliderDot, value === v && { backgroundColor: getColor() }]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.zoneRow}>
                        <Text style={styles.zoneLabel}>Düşük (40)</Text>
                        <View style={[styles.zoneBadge, { backgroundColor: getColor() + '20' }]}>
                            <Text style={{ color: getColor(), fontWeight: '700', fontSize: 12 }}>{getZone()}</Text>
                        </View>
                        <Text style={styles.zoneLabel}>Yüksek (400)</Text>
                    </View>

                    {/* Manual Input */}
                    <View style={styles.manualRow}>
                        <Text style={styles.sectionLabel}>Değer giriniz (mg/dL)</Text>
                        <View style={styles.manualInput}>
                            <TouchableOpacity onPress={() => setValue(v => Math.max(MIN_VAL, v - 1))} style={styles.adjBtn}><Text style={styles.adjText}>−</Text></TouchableOpacity>
                            <Text style={[styles.manualValue, { color: getColor() }]}>{value}</Text>
                            <TouchableOpacity onPress={() => setValue(v => Math.min(MAX_VAL, v + 1))} style={styles.adjBtn}><Text style={styles.adjText}>+</Text></TouchableOpacity>
                        </View>
                    </View>

                    {/* Meal Period */}
                    <Text style={styles.sectionLabel}>Öğün Dönemi</Text>
                    <View style={styles.mealGrid}>
                        {MEAL_PERIODS.map(m => (
                            <TouchableOpacity
                                key={m}
                                style={[styles.mealBtn, mealPeriod === m && { borderColor: PRIMARY, backgroundColor: '#FEF3EE' }]}
                                onPress={() => setMealPeriod(m)}
                            >
                                <Text style={[styles.mealBtnText, mealPeriod === m && { color: PRIMARY, fontWeight: '700' }]}>
                                    {m === 'Pre-Breakfast' ? 'Kahvaltı Öncesi' : m === 'Post-Breakfast' ? 'Kahvaltı Sonrası' : m === 'Pre-Lunch' ? 'Öğle Öncesi' : 'Öğle Sonrası'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Date & Time */}
                    <View style={styles.dtRow}>
                        <View style={[styles.dtBox, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.dtLabel}>Tarih</Text>
                            <Text style={styles.dtValue}>📅 Bugün</Text>
                        </View>
                        <View style={[styles.dtBox, { flex: 1 }]}>
                            <Text style={styles.dtLabel}>Saat</Text>
                            <Text style={styles.dtValue}>🕐 {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                    </View>

                    {/* Symptoms */}
                    <View style={styles.symptomRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.symptomTitle}>🤕 Belirti hissediyor musunuz?</Text>
                            <Text style={styles.symptomSub}>Baş dönmesi, susuzluk, yorgunluk</Text>
                        </View>
                        <Switch value={hasSymptoms} onValueChange={setHasSymptoms} trackColor={{ false: '#E0E0E0', true: PRIMARY }} thumbColor="#fff" />
                    </View>

                    {/* Notes */}
                    <Text style={styles.sectionLabel}>Ek Notlar</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Öğününüz nasıldı? Egzersiz yaptınız mı?"
                        placeholderTextColor="#BDBDBD"
                        multiline
                        numberOfLines={3}
                        value={notes}
                        onChangeText={setNotes}
                    />

                    {/* Save */}
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Save size={20} color="#fff" />
                        <Text style={styles.saveBtnText}>Kaydı Kaydet</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    pageTitle: { fontSize: 18, fontWeight: '800', color: '#1A1C1E' },
    iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    valueDisplay: { alignItems: 'center', marginVertical: 24 },
    valueLabel: { fontSize: 11, color: '#9BA1A6', fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
    bigValue: { fontSize: 68, fontWeight: '900', lineHeight: 72 },
    unit: { fontSize: 22, fontWeight: '400', color: '#9BA1A6' },
    barSlider: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 60, marginBottom: 8 },
    bar: { width: '8%', borderRadius: 4, height: '100%' },
    sliderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    sliderDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
    zoneRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    zoneLabel: { fontSize: 11, color: '#9BA1A6' },
    zoneBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
    manualRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    manualInput: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    adjBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    adjText: { fontSize: 20, fontWeight: '700', color: '#1A1C1E' },
    manualValue: { fontSize: 22, fontWeight: '800', minWidth: 50, textAlign: 'center' },
    sectionLabel: { fontSize: 15, fontWeight: '700', color: '#1A1C1E', marginBottom: 10 },
    mealGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    mealBtn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: '#E8E8E8', backgroundColor: '#F9F9F9' },
    mealBtnText: { fontSize: 13, color: '#6C757D' },
    dtRow: { flexDirection: 'row', marginBottom: 16 },
    dtBox: { backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14 },
    dtLabel: { fontSize: 11, color: '#9BA1A6', fontWeight: '600', marginBottom: 4 },
    dtValue: { fontSize: 15, fontWeight: '700', color: '#1A1C1E' },
    symptomRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3EE', borderRadius: 16, padding: 16, marginBottom: 20 },
    symptomTitle: { fontSize: 14, fontWeight: '700', color: '#1A1C1E', marginBottom: 2 },
    symptomSub: { fontSize: 12, color: '#9BA1A6' },
    notesInput: { backgroundColor: '#F5F5F5', borderRadius: 16, padding: 16, fontSize: 14, color: '#1A1C1E', minHeight: 80, textAlignVertical: 'top', marginBottom: 24 },
    saveBtn: { backgroundColor: PRIMARY, borderRadius: 18, padding: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
    saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
