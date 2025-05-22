import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaskProvider } from "../context/TaskContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function Header() {
    const theme = useTheme();
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    
    return (
        <View style={[
            styles.header, 
            { 
                backgroundColor: theme.colors.background,
                paddingTop: insets.top,
            }
        ]}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Image 
                source={colorScheme === 'dark' ? require('../assets/images/QuickTask_Logo-Dark.png') : require('../assets/images/QuickTask_Logo-Bright.png')}
                style={styles.logo}
            />
        </View>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <TaskProvider>
                <View style={styles.container}>
                    <Header />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    />
                </View>
            </TaskProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    logo: {
        height: 100,
        width: 180,
        resizeMode: 'contain',
    },
});
