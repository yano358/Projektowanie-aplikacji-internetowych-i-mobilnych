"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface AddCommentDialogProps {
  open: boolean;
  onClose: () => string;
}

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({
  open,
  onClose,
}) => {
  const handleAddComment = async () => {
    setComment(onClose());
  };

  const [comment, setComment] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a comment</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          label="Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setComment(onClose);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommentDialog;
