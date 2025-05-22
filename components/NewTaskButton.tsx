import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function NewTaskButton() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Pressable 
            style={{ 
                backgroundColor: theme.colors.background,
                padding: 16,
                borderRadius: 8,
                alignItems: 'center'
            }} 
            onPress={() => router.push({ pathname: "/new-task", })}
        >
            <Text style={{ color: theme.colors.text }}>New Task</Text>
        </Pressable>
    );
}