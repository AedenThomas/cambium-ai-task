import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi, Task, TaskCreate } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const TodoApp = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all tasks
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskTitle('');
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, ...task }: { id: number } & Partial<Task>) =>
      taskApi.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask: TaskCreate = {
        title: newTaskTitle.trim(),
        completed: false,
      };
      createTaskMutation.mutate(newTask);
    }
  };

  const toggleTask = (id: number, completed: boolean) => {
    updateTaskMutation.mutate({
      id,
      completed: !completed,
    });
  };

  const deleteTask = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto shadow-md">
          <div className="p-8">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            </header>

            {/* Task Input Form */}
            <div className="mb-8">
              <div className="flex gap-3">
                <Skeleton className="flex-1 h-10" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            {/* Loading Skeleton for Task List */}
            <div className="space-y-2">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="flex-1 h-5" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto shadow-md">
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
            <p className="text-muted-foreground">
              Failed to connect to the server. Please make sure the backend is running.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-md">
        <div className="p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
          </header>

          {/* Task Input Form */}
          <form onSubmit={addTask} className="mb-8">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
          </form>

          {/* Task List */}
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-base">
                  Your list is empty! Add a new task to get started.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id, task.completed)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
          className="rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </div>
      <span
        className={`flex-1 text-base transition-all duration-300 ${
          task.completed
            ? 'line-through text-muted-foreground'
            : 'text-foreground'
        }`}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoApp;
