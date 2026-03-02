import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    SafeAreaView, Dimensions, StatusBar
} from 'react-native';
import { Bell, ChevronRight, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import Svg, { Circle, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const PRIMARY = '#E8562A';
const TEAL = '#2AC4B3';
const BG = '#F8F5F2';

function CircularProgress({ value, max, color, icon, label, sub }: {
    value: number; max: number; color: string; icon: string; label: string; sub: string;
}) {
    const r = 44;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / max, 1);
    const dash = pct * circ;
    return (
        <View style={styles.ringCard}>
            <Svg width={110} height={110} viewBox="0 0 110 110">
                <G rotation="-90" origin="55,55">
                    <Circle cx="55" cy="55" r={r} stroke="#EDEDF0" strokeWidth={8} fill="none" />
                    <Circle
                        cx="55" cy="55" r={r}
                        stroke={color}
                        strokeWidth={8}
                        fill="none"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeLinecap="round"
                    />
                </G>
                <Text style={{ position: 'absolute', fontSize: 28 }}>{icon}</Text>
            </Svg>
            <Text style={[styles.ringValue, { color: '#1A1C1E' }]}>{value.toLocaleString()}</Text>
            <Text style={styles.ringLabel}>{label}</Text>
            <Text style={styles.ringSub}>{sub}</Text>
        </View>
    );
}

const ACTIVITIES = [
    { icon: '🚶', label: 'Yürüyüş' },
    { icon: '🚴', label: 'Bisiklet' },
    { icon: '🧘', label: 'Yoga' },
    { icon: '🏊', label: 'Yüzme' },
    { icon: '🏋️', label: 'Ağırlık' },
];

const INTENSITIES = ['Düşük', 'Orta', 'Yüksek'];
const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const TODAY_IDX = 2; // Wednesday

export default function HomeScreen() {
    const { goals, user, addActivityLog } = useApp();
    const router = useRouter();
    const [selectedActivity, setSelectedActivity] = useState(0);
    const [duration, setDuration] = useState(45);
    const [intensityIdx, setIntensityIdx] = useState(1);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        addActivityLog({
            type: ACTIVITIES[selectedActivity].label,
            duration,
            intensity: INTENSITIES[intensityIdx],
            date: new Date().toLocaleDateString('tr-TR'),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatarCircle}>
                            <Text style={styles.avatarText}>{user.name.slice(0, 2).toUpperCase()}</Text>
                        </View>
                        <View>
                            <Text style={styles.greeting}>Günaydın,</Text>
                            <Text style={styles.userName}>{user.name.split(' ')[1]}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bellBtn}>
                        <Bell size={22} color="#1A1C1E" />
                        <View style={styles.bellDot} />
                    </TouchableOpacity>
                </View>

                {/* Today's Progress */}
                <Text style={styles.sectionTitle}>Bugünkü İlerleme</Text>
                <View style={styles.ringsRow}>
                    <CircularProgress value={goals.steps.current} max={goals.steps.target} color={TEAL} icon="👟" label="ADIM" sub={`/ ${goals.steps.target.toLocaleString()}`} />
                    <CircularProgress value={goals.activeMin.current} max={goals.activeMin.target} color={PRIMARY} icon="⏱" label="AKTİF DK" sub={`${goals.activeMin.current} / ${goals.activeMin.target}`} />
                </View>

                {/* Quick Log */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>Hızlı Kayıt</Text>
                    <TouchableOpacity onPress={() => router.push('/history')}><Text style={styles.viewAll}>Tümünü Gör</Text></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actScroll}>
                    {ACTIVITIES.map((a, i) => (
                        <TouchableOpacity key={i} style={[styles.actItem, selectedActivity === i && styles.actItemActive]} onPress={() => setSelectedActivity(i)}>
                            <Text style={styles.actIcon}>{a.icon}</Text>
                            <Text style={[styles.actLabel, selectedActivity === i && styles.actLabelActive]}>{a.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Duration & Intensity */}
                <View style={styles.logCard}>
                    <View style={styles.logRow}>
                        <Text style={styles.logRowLabel}>Süre</Text>
                        <View style={[styles.pill, { backgroundColor: '#FEE9E3' }]}><Text style={{ color: PRIMARY, fontWeight: '700' }}>{duration} dk</Text></View>
                    </View>
                    <View style={styles.sliderTrack}>
                        <View style={[styles.sliderFill, { width: `${((duration - 5) / 115) * 100}%`, backgroundColor: PRIMARY }]} />
                        <TouchableOpacity style={[styles.sliderThumb, { left: `${((duration - 5) / 115) * 100}%`, borderColor: PRIMARY }]} />
                    </View>
                    <View style={[styles.sliderBtns]}>
                        {[15, 30, 45, 60, 90, 120].map(d => (
                            <TouchableOpacity key={d} style={[styles.miniBtn, duration === d && { backgroundColor: PRIMARY }]} onPress={() => setDuration(d)}>
                                <Text style={{ fontSize: 11, color: duration === d ? '#fff' : '#6C757D', fontWeight: '600' }}>{d}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={[styles.logRow, { marginTop: 16 }]}>
                        <Text style={styles.logRowLabel}>Yoğunluk</Text>
                        <View style={[styles.pill, { backgroundColor: '#E8F8F7' }]}><Text style={{ color: TEAL, fontWeight: '700' }}>{INTENSITIES[intensityIdx]}</Text></View>
                    </View>
                    <View style={styles.intensityRow}>
                        {INTENSITIES.map((int, i) => (
                            <TouchableOpacity key={i} style={[styles.intensityBtn, intensityIdx === i && { backgroundColor: TEAL }]} onPress={() => setIntensityIdx(i)}>
                                <Text style={{ color: intensityIdx === i ? '#fff' : '#6C757D', fontWeight: '600', fontSize: 13 }}>{int}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={[styles.saveBtn, saved && { backgroundColor: '#40916C' }]} onPress={handleSave}>
                        <Text style={styles.saveBtnText}>{saved ? '✓ Kaydedildi!' : 'Aktiviteyi Kaydet'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Weekly Summary */}
                <Text style={styles.sectionTitle}>Haftalık Özet</Text>
                <View style={styles.weekCard}>
                    <View style={styles.weekBarRow}>
                        {DAYS.map((d, i) => (
                            <View key={i} style={styles.weekBarCol}>
                                <View style={[styles.weekBar, { height: [40, 55, 80, 35, 60, 20, 10][i], backgroundColor: i === TODAY_IDX ? PRIMARY : '#E8E8E8' }]} />
                                <Text style={[styles.weekBarLabel, i === TODAY_IDX && { color: PRIMARY, fontWeight: '700' }]}>{d}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={[styles.streakBanner, { backgroundColor: '#FEF3EE' }]}>
                        <Text style={{ fontSize: 20 }}>🏆</Text>
                        <Text style={[styles.streakText, { color: '#1A1C1E' }]}>
                            <Text style={{ color: PRIMARY, fontWeight: '700' }}>3 günlük seri!</Text> Çarşamba hedefinizi %15 aştınız.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-log')}>
                <Plus size={28} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scroll: { paddingBottom: 100, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginBottom: 20 },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatarCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FEE9E3', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: PRIMARY },
    avatarText: { color: PRIMARY, fontWeight: '800', fontSize: 16 },
    greeting: { fontSize: 12, color: '#9BA1A6' },
    userName: { fontSize: 20, fontWeight: '800', color: '#1A1C1E' },
    bellBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
    bellDot: { position: 'absolute', top: 8, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: PRIMARY },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1C1E', marginBottom: 12, marginTop: 4 },
    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
    viewAll: { color: PRIMARY, fontWeight: '700', fontSize: 13 },
    ringsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
    ringCard: { flex: 1, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', paddingVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
    ringValue: { fontSize: 26, fontWeight: '800', marginTop: 8 },
    ringLabel: { fontSize: 11, color: '#9BA1A6', fontWeight: '700', letterSpacing: 1 },
    ringSub: { fontSize: 13, color: '#9BA1A6', marginTop: 2 },
    actScroll: { marginBottom: 16 },
    actItem: { alignItems: 'center', marginRight: 12, backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
    actItemActive: { backgroundColor: PRIMARY },
    actIcon: { fontSize: 28, marginBottom: 6 },
    actLabel: { fontSize: 12, color: '#6C757D', fontWeight: '600' },
    actLabelActive: { color: '#fff' },
    logCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
    logRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    logRowLabel: { fontSize: 16, fontWeight: '700', color: '#1A1C1E' },
    pill: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
    sliderTrack: { height: 4, backgroundColor: '#F0F0F0', borderRadius: 2, marginBottom: 12, position: 'relative' },
    sliderFill: { height: 4, borderRadius: 2, position: 'absolute', left: 0, top: 0 },
    sliderThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff', borderWidth: 3, position: 'absolute', top: -7, marginLeft: -9 },
    sliderBtns: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
    miniBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, backgroundColor: '#F5F5F5' },
    intensityRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
    intensityBtn: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: '#F5F5F5', alignItems: 'center' },
    saveBtn: { backgroundColor: PRIMARY, borderRadius: 16, padding: 16, alignItems: 'center' },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
    weekCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
    weekBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 90, marginBottom: 16 },
    weekBarCol: { alignItems: 'center', gap: 6 },
    weekBar: { width: 28, borderRadius: 8 },
    weekBarLabel: { fontSize: 11, color: '#9BA1A6', fontWeight: '600' },
    streakBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12 },
    streakText: { flex: 1, fontSize: 13, lineHeight: 18 },
    fab: { position: 'absolute', bottom: 75, alignSelf: 'center', width: 60, height: 60, borderRadius: 30, backgroundColor: PRIMARY, justifyContent: 'center', alignItems: 'center', shadowColor: PRIMARY, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 12 },
});
