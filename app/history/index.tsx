import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, SafeAreaView,
    StatusBar, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, SlidersHorizontal, Plus } from 'lucide-react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Polygon, G, Line } from 'react-native-svg';
import { useApp, BloodSugarLog } from '../../context/AppContext';

const PRIMARY = '#E8562A';
const TEAL = '#2AC4B3';
const BG = '#F8F5F2';
const WEEK_DATA = [98, 112, 105, 140, 88, 120, 98];
const DAYS_LABELS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

function SparkLine() {
    const W = 300, H = 80;
    const min = 70, max = 160;
    const pts = WEEK_DATA.map((v, i) => `${(i / 6) * W},${H - ((v - min) / (max - min)) * H}`).join(' ');
    const polyPts = `0,${H} ${pts} ${W},${H}`;
    return (
        <Svg width={W} height={H} style={{ marginVertical: 8 }}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={PRIMARY} stopOpacity="0.25" />
                    <Stop offset="1" stopColor={PRIMARY} stopOpacity="0" />
                </LinearGradient>
            </Defs>
            <Polygon points={polyPts} fill="url(#grad)" />
            <Polyline points={pts} fill="none" stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}

const STATUS_COLORS: Record<string, string> = { 'IN RANGE': TEAL, HIGH: PRIMARY, LOW: '#F4A522' };
const STATUS_BG: Record<string, string> = { 'IN RANGE': '#E6F9F7', HIGH: '#FEE9E3', LOW: '#FEF6E3' };
const STATUS_TR: Record<string, string> = { 'IN RANGE': 'NORMAL', HIGH: 'YÜKSEK', LOW: 'DÜŞÜK' };
const MEAL_ICONS: Record<string, string> = {
    'Pre-Breakfast': '🍳', 'Post-Breakfast': '☕', 'Pre-Lunch': '🥗', 'Post-Lunch': '🍽️',
    'Before Bed': '🌙', 'After Dinner': '🍵', 'TODAY': '📅', 'YESTERDAY': '📅',
};

function LogItem({ log }: { log: BloodSugarLog }) {
    const c = STATUS_COLORS[log.status] || TEAL;
    const bg = STATUS_BG[log.status] || '#E6F9F7';
    return (
        <View style={[styles.logItem, { borderLeftColor: c }]}>
            <View style={[styles.logIconBox, { backgroundColor: bg }]}>
                <Text style={{ fontSize: 22 }}>{MEAL_ICONS[log.mealPeriod] ?? '💉'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.logVal}><Text style={{ fontWeight: '800', fontSize: 17 }}>{log.value}</Text> <Text style={styles.mgdl}>mg/dL</Text></Text>
                <Text style={styles.logMeal}>{log.mealPeriod}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.logTime}>{log.time}</Text>
                <View style={[styles.statusBadge, { backgroundColor: bg }]}>
                    <Text style={[styles.statusText, { color: c }]}>{STATUS_TR[log.status]}</Text>
                </View>
            </View>
        </View>
    );
}

export default function HistoryScreen() {
    const { bloodSugarLogs } = useApp();
    const router = useRouter();

    const today = bloodSugarLogs.filter(l => l.date === 'TODAY');
    const yesterday = bloodSugarLogs.filter(l => l.date === 'YESTERDAY');
    const avg = Math.round(WEEK_DATA.reduce((a, b) => a + b, 0) / WEEK_DATA.length);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <ArrowLeft size={22} color="#1A1C1E" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Geçmiş</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <SlidersHorizontal size={22} color="#1A1C1E" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                {/* Chart Card */}
                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <View>
                            <Text style={styles.chartSub}>Haftalık Ortalama</Text>
                            <Text style={styles.chartMain}><Text style={{ color: PRIMARY }}>{avg}</Text> mg/dL</Text>
                        </View>
                        <View style={styles.trendBadge}>
                            <Text style={{ color: TEAL, fontWeight: '700', fontSize: 13 }}>↘ 2.4%</Text>
                        </View>
                    </View>
                    <SparkLine />
                    <View style={styles.dayLabels}>
                        {DAYS_LABELS.map((d, i) => (
                            <Text key={i} style={[styles.dayLabel, i === 2 && { color: PRIMARY, fontWeight: '700' }]}>{d}</Text>
                        ))}
                    </View>
                </View>

                {/* Today */}
                {today.length > 0 && (
                    <>
                        <Text style={styles.groupHeader}>BUGÜN</Text>
                        {today.map(l => <LogItem key={l.id} log={l} />)}
                    </>
                )}

                {/* Yesterday */}
                {yesterday.length > 0 && (
                    <>
                        <Text style={styles.groupHeader}>DÜN</Text>
                        {yesterday.map(l => <LogItem key={l.id} log={l} />)}
                    </>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-log')}>
                <Plus size={28} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    pageTitle: { fontSize: 18, fontWeight: '800', color: '#1A1C1E' },
    iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
    chartCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    chartSub: { fontSize: 13, color: '#9BA1A6', fontWeight: '600' },
    chartMain: { fontSize: 28, fontWeight: '800', color: '#1A1C1E', marginTop: 2 },
    trendBadge: { backgroundColor: '#E6F9F7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    dayLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
    dayLabel: { fontSize: 11, color: '#9BA1A6', fontWeight: '600' },
    groupHeader: { fontSize: 12, fontWeight: '800', color: '#9BA1A6', letterSpacing: 1.5, marginBottom: 10, marginTop: 4 },
    logItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
    logIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    logVal: { fontSize: 16, color: '#1A1C1E' },
    mgdl: { fontSize: 13, color: '#9BA1A6', fontWeight: '400' },
    logMeal: { fontSize: 13, color: '#9BA1A6', marginTop: 2 },
    logTime: { fontSize: 13, color: '#1A1C1E', fontWeight: '600' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, marginTop: 4 },
    statusText: { fontSize: 11, fontWeight: '800' },
    fab: { position: 'absolute', bottom: 20, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: PRIMARY, justifyContent: 'center', alignItems: 'center', shadowColor: PRIMARY, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 12 },
});
