import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, SafeAreaView,
    StatusBar, TouchableOpacity, Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingDown, TrendingUp, Minus, Plus } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';

const PRIMARY = '#E8562A';
const TEAL = '#2AC4B3';
const BG = '#F8F5F2';
const WEEK_DATA = [98, 112, 105, 140, 88, 120, 98];

export default function InsightsScreen() {
    const { bloodSugarLogs, activityLogs, goals } = useApp();
    const router = useRouter();

    const avg = Math.round(WEEK_DATA.reduce((a, b) => a + b, 0) / WEEK_DATA.length);
    const inRange = bloodSugarLogs.filter(l => l.status === 'IN RANGE').length;
    const total = bloodSugarLogs.length;
    const pctInRange = total > 0 ? Math.round((inRange / total) * 100) : 0;

    const stats = [
        { label: 'Haftalık Ort.', value: `${avg}`, unit: 'mg/dL', icon: '📊', color: PRIMARY },
        { label: 'Normal Aralık', value: `${pctInRange}%`, unit: 'kayıtlar', icon: '✅', color: TEAL },
        { label: 'Toplam Kayıt', value: `${total}`, unit: 'giriş', icon: '📋', color: '#F4A522' },
        { label: 'Aktivite', value: `${activityLogs.length}`, unit: 'seans', icon: '🏃', color: '#9B59B6' },
    ];

    const tips = [
        { icon: '💡', title: 'Kan Şekeri İpucu', body: 'Yemekten 2 saat sonra ölçüm yapmanız daha doğru sonuçlar verir.' },
        { icon: '🥗', title: 'Beslenme', body: 'Lif içeriği yüksek besinler kan şekerinin dengelenmesine yardımcı olur.' },
        { icon: '🚶', title: 'Hareket', body: 'Günde 30 dakika yürüyüş insülin hassasiyetini artırabilir.' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />
            <View style={styles.topBar}>
                <Text style={styles.pageTitle}>İstatistikler</Text>
                <TouchableOpacity onPress={() => router.push('/add-log')} style={[styles.iconBtn, { backgroundColor: PRIMARY }]}>
                    <Plus size={22} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((s, i) => (
                        <View key={i} style={[styles.statCard, { borderTopColor: s.color, borderTopWidth: 4 }]}>
                            <Text style={styles.statIcon}>{s.icon}</Text>
                            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                            <Text style={styles.statUnit}>{s.unit}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Weekly Insight */}
                <View style={[styles.insightBanner, { backgroundColor: '#1A1C1E' }]}>
                    <View>
                        <Text style={styles.insightSmall}>Haftalık Analiz</Text>
                        <Text style={styles.insightText}>Haftalık kan şekeriniz {'\n'} ortalamaya göre <Text style={{ color: TEAL, fontWeight: '800' }}>%4 düştü.</Text></Text>
                    </View>
                    <TouchableOpacity style={styles.reportBtn}>
                        <Text style={styles.reportBtnText}>RAPORU GÖR</Text>
                    </TouchableOpacity>
                </View>

                {/* Trend Breakdown */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Bu Haftaki Eğilim</Text>
                <View style={styles.trendCard}>
                    {[
                        { label: 'Düşük', count: bloodSugarLogs.filter(l => l.status === 'LOW').length, color: '#F4A522', Icon: TrendingDown },
                        { label: 'Normal', count: inRange, color: TEAL, Icon: Minus },
                        { label: 'Yüksek', count: bloodSugarLogs.filter(l => l.status === 'HIGH').length, color: PRIMARY, Icon: TrendingUp },
                    ].map((t, i) => (
                        <View key={i} style={styles.trendItem}>
                            <View style={[styles.trendIcon, { backgroundColor: t.color + '20' }]}>
                                <t.Icon size={20} color={t.color} />
                            </View>
                            <Text style={[styles.trendCount, { color: t.color }]}>{t.count}</Text>
                            <Text style={styles.trendLabel}>{t.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Tips */}
                <Text style={styles.sectionTitle}>Sağlık İpuçları</Text>
                {tips.map((tip, i) => (
                    <View key={i} style={styles.tipCard}>
                        <Text style={styles.tipIcon}>{tip.icon}</Text>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.tipTitle}>{tip.title}</Text>
                            <Text style={styles.tipBody}>{tip.body}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    pageTitle: { fontSize: 22, fontWeight: '800', color: '#1A1C1E' },
    iconBtn: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
    statCard: { width: '47%', backgroundColor: '#fff', borderRadius: 18, padding: 16, alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    statIcon: { fontSize: 26, marginBottom: 8 },
    statValue: { fontSize: 28, fontWeight: '900' },
    statUnit: { fontSize: 12, color: '#9BA1A6', marginTop: 2 },
    statLabel: { fontSize: 13, color: '#6C757D', fontWeight: '600', marginTop: 6 },
    insightBanner: { borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
    insightSmall: { fontSize: 11, color: '#9BA1A6', fontWeight: '600', marginBottom: 6 },
    insightText: { fontSize: 15, color: '#fff', fontWeight: '600', lineHeight: 22 },
    reportBtn: { backgroundColor: '#E8562A', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
    reportBtnText: { color: '#fff', fontWeight: '800', fontSize: 11 },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1A1C1E', marginBottom: 12 },
    trendCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 24, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    trendItem: { flex: 1, alignItems: 'center', gap: 8 },
    trendIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    trendCount: { fontSize: 24, fontWeight: '900' },
    trendLabel: { fontSize: 12, color: '#6C757D', fontWeight: '600' },
    tipCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 10, alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
    tipIcon: { fontSize: 28 },
    tipTitle: { fontSize: 14, fontWeight: '700', color: '#1A1C1E', marginBottom: 4 },
    tipBody: { fontSize: 13, color: '#6C757D', lineHeight: 18 },
});
