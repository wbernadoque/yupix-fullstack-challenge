'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { tasksApi } from '@/lib/api'
import { Task, UpdateTaskRequest } from '@yupix/types'
import { format } from 'date-fns'
import DialogTask from '@/components/dialog'

const TasksPage:React.FC = () => {
  const [open, setOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({ open: false, message: '', severity: 'success' })
  const [formData, setFormData] = useState({ title: '' })

  const queryClient = useQueryClient()

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getAll,
  })

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setOpen(false)
      setFormData({ title: '' })
      setSnackbar({
        open: true,
        message: 'Task created successfully!',
        severity: 'success',
      })
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Failed to create task',
        severity: 'error',
      })
    },
  })

  // Update task mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskRequest }) =>
      tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setEditTask(null)
      setOpen(false)
      setFormData({ title: '' })
      setSnackbar({
        open: true,
        message: 'Task updated successfully!',
        severity: 'success',
      })
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Failed to update task',
        severity: 'error',
      })
    },
  })

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setSnackbar({
        open: true,
        message: 'Task deleted successfully!',
        severity: 'success',
      })
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Failed to delete task',
        severity: 'error',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editTask) {
      updateMutation.mutate({ id: editTask.id, data: { title: formData.title } })
    } else {
      createMutation.mutate({ title: formData.title })
    }
  }

  const handleEdit = (task: Task) => {
    setEditTask(task)
    setFormData({ title: task.title })
    setOpen(true)
  }

  const handleToggleComplete = (task: Task) => {
    updateMutation.mutate({
      id: task.id,
      data: { completed: !task.completed },
    })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setEditTask(null)
    setFormData({ title: '' })
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load tasks. Please check if the backend server is running.
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row',  }} justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      </Box>

      <Paper elevation={2}>
        <List>
          {tasks.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No tasks found"
                secondary="Create your first task to get started!"
              />
            </ListItem>
          ) : (
            tasks.map((task, index) => (
              <ListItem
                key={task.id}
                divider={index < tasks.length - 1}
                sx={{
                  opacity: task.completed ? 0.7 : 1,
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  color="primary"
                />
                <ListItemText
                  primary={task.title}
                  secondary={
                    <Box>
                      <Chip
                        label={task.completed ? 'Completed' : 'Pending'}
                        color={task.completed ? 'success' : 'warning'}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Created: {format(new Date(task.createdAt), 'MMM dd, yyyy HH:mm')}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(task)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(task.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      {/* Add/Edit Task Dialog */}
      <DialogTask
        open={open}
        onClose={handleClose}
        editTask={editTask !== null}
        title={formData.title}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        setFormData={setFormData}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
} 

export default TasksPage;