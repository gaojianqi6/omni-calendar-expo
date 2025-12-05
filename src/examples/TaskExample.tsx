import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Text, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useTasks, useCreateTask, useDeleteTask, useUpdateTask } from '../services/taskService';
import { useTaskStore } from '../store/useTaskStore';

/**
 * Example component demonstrating:
 * - React Query for API calls
 * - Zustand for local state
 * - React Native Paper for UI
 * - react-i18next for translations
 */
export function TaskExample() {
  const { t } = useTranslation();
  
  // React Query hooks for API calls
  const { data: tasks, isLoading, error } = useTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask('');
  
  // Zustand store for local state
  const { selectedTaskId, setSelectedTaskId } = useTaskStore();

  const handleCreateTask = () => {
    createTask.mutate({
      title: `Task ${Date.now()}`,
      description: 'Example task description',
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask.mutate(undefined, {
      onSuccess: () => {
        console.log('Task deleted successfully');
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{t('common.error')}: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Button
        mode="contained"
        onPress={handleCreateTask}
        style={styles.button}
      >
        {t('tasks.addTask')}
      </Button>

      {tasks?.map((task) => (
        <Card
          key={task.id}
          style={styles.card}
          onPress={() => setSelectedTaskId(task.id)}
        >
          <Card.Title title={task.title} />
          <Card.Content>
            <Text>{task.description || 'No description'}</Text>
            <Text style={styles.status}>
              {task.completed ? t('tasks.completed') : t('tasks.pending')}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleDeleteTask(task.id)}>
              {t('common.delete')}
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
  },
  status: {
    marginTop: 8,
    fontStyle: 'italic',
  },
});

