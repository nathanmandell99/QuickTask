import { useTask } from "@/context/TaskContext";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NewTaskButton from "../components/NewTaskButton";
import TaskList from "../components/TaskList";
import { useTheme } from "../context/ThemeContext";

export default function Index() {
  const { tasks, updateTask, deleteTask } = useTask();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const headerStyle = {
    color: theme.colors.text,
    fontSize: 24,
    padding: 16,
  };

  // Defining body content here is cleaner than having two return statements.
  const bodyContent = tasks.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', maxWidth: 600, width: '100%', alignSelf: 'center' }}>
      <Text style={headerStyle}>No tasks</Text>
    </View>
  ) : (
    <View style={styles.contentContainer}>
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {bodyContent}
      <View style={[
        styles.buttonContainer, 
        { 
          backgroundColor: theme.colors.background,
          paddingBottom: insets.bottom,
        }
      ]}>
        <NewTaskButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 100,
    paddingTop: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 45,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  }
});