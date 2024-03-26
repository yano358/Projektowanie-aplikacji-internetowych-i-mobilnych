import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddCommentDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({
  open,
  onClose,
}) => {
  const handleAddComment = async () => {
    onClose();
  };

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
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommentDialog;
