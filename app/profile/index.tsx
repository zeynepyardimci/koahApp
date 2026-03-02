import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, SafeAreaView,
    StatusBar, TouchableOpacity, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, ChevronRight, LogOut, User, Bell, Shield, HelpCircle, Edit2 } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';

const PRIMARY = '#E8562A';
const TEAL = '#2AC4B3';
const BG = '#F8F5F2';

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
    return (
        <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }]} />
        </View>
    );
}

export default function ProfileScreen() {
    const { user, goals } = useApp();
    const router = useRouter();

    const healthGoals = [
        {
            icon: '⚖️', label: 'Kilo Hedefi',
            current: goals.weight.current, target: goals.weight.target,
            unit: 'kg', color: PRIMARY,
            hint: `${goals.weight.current - goals.weight.target} kg hedefe kaldı`,
        },
        {
            icon: '💧', label: 'Su Tüketimi',
            current: goals.water.current, target: goals.water.target,
            unit: 'L', color: TEAL,
            hint: `${(goals.water.target - goals.water.current).toFixed(1)}L daha içmelisiniz`,
        },
        {
            icon: '🧬', label: 'HbA1c Hedefi',
            current: goals.hba1c.current, target: goals.hba1c.target,
            unit: '%', color: '#52B788',
            hint: 'Hedefe çok yakınsınız!',
        },
    ];

    const settings = [
        { icon: User, label: 'Kişisel Bilgiler' },
        { icon: Bell, label: 'Hatırlatıcı & Bildirimler' },
        { icon: Shield, label: 'Gizlilik & Güvenlik' },
        { icon: HelpCircle, label: 'Destek Merkezi' },
    ];

    const handleLogout = () => {
        Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğinize emin misiniz?', [
            { text: 'İptal', style: 'cancel' },
            { text: 'Çıkış Yap', style: 'destructive', onPress: () => Alert.alert('Çıkış yapıldı.') },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />
            <View style={styles.topBar}>
                <Text style={styles.pageTitle}>Profilim</Text>
                <TouchableOpacity style={styles.iconBtn}><Settings size={22} color="#1A1C1E" /></TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                {/* Profile Header */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarWrap}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{user.name.slice(0, 2).toUpperCase()}</Text>
                        </View>
                        <View style={[styles.editBadge, { backgroundColor: PRIMARY }]}>
                            <Edit2 size={12} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles.profileName}>{user.name}</Text>
                    <View style={[styles.conditionBadge, { backgroundColor: '#FEE9E3' }]}>
                        <Text style={{ color: PRIMARY, fontWeight: '700', fontSize: 13 }}>{user.condition}</Text>
                    </View>
                    <Text style={styles.memberSince}>Üye: {user.memberSince} itibarıyla</Text>
                </View>

                {/* Health Goals */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Sağlık Hedefleri</Text>
                    <TouchableOpacity><Text style={[styles.editLink, { color: PRIMARY }]}>Düzenle</Text></TouchableOpacity>
                </View>
                <View style={styles.goalsCard}>
                    {healthGoals.map((g, i) => (
                        <View key={i} style={[styles.goalItem, i < healthGoals.length - 1 && styles.goalDivider]}>
                            <View style={styles.goalRow}>
                                <View style={styles.goalLeft}>
                                    <Text style={{ fontSize: 22 }}>{g.icon}</Text>
                                    <Text style={styles.goalLabel}>{g.label}</Text>
                                </View>
                                <Text style={styles.goalValues}>
                                    <Text style={{ color: g.color, fontWeight: '800' }}>{g.current}{g.unit}</Text>
                                    <Text style={styles.goalTarget}> / {g.target}{g.unit}</Text>
                                </Text>
                            </View>
                            <ProgressBar value={g.current} max={g.target} color={g.color} />
                            <Text style={styles.goalHint}>{g.hint}</Text>
                        </View>
                    ))}
                </View>

                {/* Daily Goals */}
                <View style={styles.goalsCard}>
                    <View style={styles.goalRow}>
                        <View style={styles.goalLeft}>
                            <Text style={{ fontSize: 22 }}>🎯</Text>
                            <Text style={styles.goalLabel}>Günlük Hedefler</Text>
                        </View>
                        <Text style={styles.goalValues}>
                            <Text style={{ color: PRIMARY, fontWeight: '800' }}>{goals.dailyGoals.completed}</Text>
                            <Text style={styles.goalTarget}> / {goals.dailyGoals.total} tamamlandı</Text>
                        </Text>
                    </View>
                    <ProgressBar value={goals.dailyGoals.completed} max={goals.dailyGoals.total} color={TEAL} />
                </View>

                {/* Settings */}
                <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
                <View style={styles.settingsCard}>
                    {settings.map((s, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.settingRow, i < settings.length - 1 && styles.settingDivider]}
                            onPress={() => Alert.alert(s.label, 'Bu özellik yakında kullanıma açılacak.')}
                        >
                            <View style={styles.settingLeft}>
                                <s.icon size={20} color="#6C757D" />
                                <Text style={styles.settingLabel}>{s.label}</Text>
                            </View>
                            <ChevronRight size={18} color="#BDBDBD" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <LogOut size={20} color={PRIMARY} />
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Versiyon 2.4.0 (Derleme 892)</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    pageTitle: { fontSize: 22, fontWeight: '800', color: '#1A1C1E' },
    iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
    profileCard: { backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    avatarWrap: { position: 'relative', marginBottom: 12 },
    avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#FEE9E3', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: PRIMARY },
    avatarText: { color: PRIMARY, fontWeight: '900', fontSize: 30 },
    editBadge: { position: 'absolute', bottom: 2, right: 2, width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
    profileName: { fontSize: 22, fontWeight: '800', color: '#1A1C1E', marginBottom: 8 },
    conditionBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 6 },
    memberSince: { fontSize: 12, color: '#9BA1A6', marginTop: 4 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1A1C1E' },
    editLink: { fontSize: 13, fontWeight: '700' },
    goalsCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    goalItem: { paddingBottom: 16, marginBottom: 16 },
    goalDivider: { borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    goalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    goalLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    goalLabel: { fontSize: 14, fontWeight: '700', color: '#1A1C1E' },
    goalValues: { fontSize: 14 },
    goalTarget: { color: '#9BA1A6', fontWeight: '400' },
    progressTrack: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
    progressFill: { height: 8, borderRadius: 4 },
    goalHint: { fontSize: 12, color: '#9BA1A6', marginTop: 2 },
    settingsCard: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
    settingDivider: { borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    settingLabel: { fontSize: 15, color: '#1A1C1E', fontWeight: '500' },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: PRIMARY, borderRadius: 18, padding: 16, marginBottom: 16 },
    logoutText: { color: PRIMARY, fontSize: 16, fontWeight: '800' },
    versionText: { textAlign: 'center', color: '#BDBDBD', fontSize: 12, marginBottom: 8 },
});
