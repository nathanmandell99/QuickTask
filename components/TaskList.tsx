import { useMemo, useRef } from "react";
import { Animated, Pressable, SectionList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Task as TaskType } from "../types/Task";

interface TaskListProps {
  tasks: TaskType[];
  onUpdate: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

function Task({ task, onUpdate, onDelete }: { task: TaskType; onUpdate: (task: TaskType) => void; onDelete: (task: TaskType) => void }) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // We wrap onUpdate here with handleComplete to achieve a fade animation when a task is completed.
  const handleComplete = (task: TaskType) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onUpdate({ ...task, completed: !task.completed });
    });
  }

  // Similarly wrap onDelete here with handleDelete to achieve a fade animation when a task is deleted.
  const handleDelete = (task: TaskType) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDelete(task);
    });
  }
  
  // UseMemo to prevent re-rendering
  const styles = useMemo(() => getTaskStyles(theme, isLandscape), [theme, isLandscape]);

  return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.contentContainer}>
              <View style={[styles.leftSection, { opacity: task.completed ? 0.5 : 1 }]}>
                  <Pressable onPress={() => handleComplete(task)}>
                      <Text style={styles.checkbox}>{task.completed ? '☑' : '☐'}</Text>
                  </Pressable>
                  <View style={styles.textContainer}>
                      <Text style={styles.title}>{task.title}</Text>
                      <Text style={styles.description}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      >
                        {task.description}
                      </Text>
                  </View>
              </View>
              <Pressable onPress={() => handleDelete(task)}>
                  <Text style={styles.deleteButton}>Delete</Text>
              </Pressable>
          </View>
      </Animated.View>
  );
}

export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const insets = useSafeAreaInsets();
  
  // UseMemo to prevent re-rendering
  const styles = useMemo(() => getTaskListStyles(theme, isLandscape, insets), [theme, isLandscape, insets]);

  const uncompletedTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const sections = [
    {
      title: 'Tasks',
      data: uncompletedTasks,
    },
    {
      title: 'Completed',
      data: completedTasks,
    },
  ];

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <Text style={[styles.sectionHeader]}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={sections}
        renderItem={({ item }: { item: TaskType }) => (
          <Task task={item} onUpdate={onUpdate} onDelete={onDelete} />
        )}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
} 

// Because of the amount of styles that are dependent on the theme, orientation, and insets,
// it is cleaner to create the styles in separate functions.
const getTaskStyles = (theme: any, isLandscape: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: isLandscape ? 8 : 16,
        alignItems: 'flex-start',
        gap: isLandscape ? 8 : 16,
        borderBottomWidth: 1,
        borderBottomColor: `${theme.colors.text}80`,
    },
    title: {
        fontSize: isLandscape ? 16 : 18,
        color: theme.colors.text,
    },
    description: {
        fontSize: isLandscape ? 14 : 15,
        color: theme.colors.text,
        fontStyle: 'italic',
        flexShrink: 1,
    },
    checkbox: {
        color: theme.colors.checkbox,
        marginRight: isLandscape ? 8 : 16,
        fontSize: isLandscape ? 18 : 20,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: isLandscape ? 8 : 0,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: isLandscape ? 8 : 16,
        flex: 1,
        minWidth: 0,
    },
    textContainer: {
        gap: isLandscape ? 4 : 8,
        flex: 1,
        minWidth: 0,
    },
    deleteButton: {
        backgroundColor: theme.colors.background,
        padding: isLandscape ? 6 : 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.text,
        color: 'red',
        marginLeft: 8,
    }
});

const getTaskListStyles = (theme: any, isLandscape: boolean, insets: any) => StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingLeft: insets.left + 12,
      paddingRight: insets.right + 12,
    },
    header: {
      color: theme.colors.text,
      fontSize: isLandscape ? 20 : 24,
      padding: isLandscape ? 8 : 16,
      paddingLeft: insets.left + 12,
      paddingRight: insets.right + 12,
      backgroundColor: theme.colors.background,
    },
    sectionHeader: {
      color: theme.colors.text,
      fontSize: isLandscape ? 18 : 20,
      padding: isLandscape ? 8 : 16,
      paddingLeft: insets.left + 12,
      paddingRight: insets.right + 12,
      backgroundColor: theme.colors.background,
    }
});