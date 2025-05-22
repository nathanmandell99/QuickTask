import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTask } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { Task } from "../types/Task";

export default function NewTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const theme = useTheme();
    const { addTask } = useTask();

    const handleSubmit = () => {
        if (title.length === 0) {
            alert("You must enter a title");
            return;
        }
        else if (description.length > 100) {
            alert("Description cannot exceed 100 characters");
            return;
        }
        const newTask: Task = {
            id: Date.now().toString(),
            title: title,
            description: description,
            completed: false,
        };
        addTask(newTask);
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.form}>
                <TextInput
                    style={[styles.input, { 
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.text
                    }]}
                    placeholder="Task Title"
                    placeholderTextColor={theme.colors.text}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={[styles.input, styles.textArea, { 
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.text
                    }]}
                    placeholder="Task Description"
                    placeholderTextColor={theme.colors.text}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                />
                <Pressable 
                    style={[styles.button, { backgroundColor: theme.colors.text }]}
                    onPress={handleSubmit}
                >
                    <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                        Create Task
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    form: {
        gap: 16,
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
