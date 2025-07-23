import React from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Dialog } from '@mui/material';
import { Task } from '@yupix/types';

interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  editTask: boolean;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  setFormData: (data: { title: string }) => void;
}

const DialogTask: React.FC<DialogProps> = ({ open, onClose, editTask, title, onSubmit, setFormData, isLoading }) => {
  return <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
  <DialogTitle>{editTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
  <form onSubmit={onSubmit}>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Task Title"
        type="text"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setFormData({ title: e.target.value })}
        required
        disabled={isLoading}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={!title.trim() || isLoading}
      >
        {isLoading ? (
          <CircularProgress size={20} />
        ) : editTask ? (
          'Update'
        ) : (
          'Create'
        )}
      </Button>
    </DialogActions>
  </form>
</Dialog>
}

export default DialogTask;
