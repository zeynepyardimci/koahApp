import { Tabs } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Home, BarChart2, User, TrendingUp } from 'lucide-react-native';
import { AppProvider } from '../context/AppContext';
import { useRouter } from 'expo-router';

const PRIMARY = '#E8562A';
const TEAL = '#2AC4B3';

function FABButton() {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={() => router.push('/add-log')}
        >
            <View style={styles.fabInner}>
                <Home size={24} color="#fff" />
            </View>
        </TouchableOpacity>
    );
}

export default function RootLayout() {
    return (
        <AppProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarActiveTintColor: PRIMARY,
                    tabBarInactiveTintColor: '#ADB5BD',
                    tabBarLabelStyle: styles.tabLabel,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <Home size={22} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="history/index"
                    options={{
                        title: 'History',
                        tabBarIcon: ({ color }) => <TrendingUp size={22} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="add-log"
                    options={{
                        title: '',
                        tabBarIcon: () => null,
                        tabBarButton: () => null,
                    }}
                />
                <Tabs.Screen
                    name="insights/index"
                    options={{
                        title: 'Insights',
                        tabBarIcon: ({ color }) => <BarChart2 size={22} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <User size={22} color={color} />,
                    }}
                />
                {/* hide old nested routes */}
                <Tabs.Screen name="exercises/index" options={{ href: null }} />
                <Tabs.Screen name="blood-sugar/index" options={{ href: null }} />
                <Tabs.Screen name="forms/index" options={{ href: null }} />
                <Tabs.Screen name="forms/nutrition-add" options={{ href: null }} />
            </Tabs>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1,
        height: Platform.OS === 'ios' ? 85 : 65,
        paddingBottom: Platform.OS === 'ios' ? 25 : 8,
        paddingTop: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    fabInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E8562A',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E8562A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
});
