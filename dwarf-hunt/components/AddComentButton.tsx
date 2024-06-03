import { Button, Box } from "@mui/material";
import { useState } from "react";
import AddCommentDialog from "./AddCommentDialog";

interface AddCommentButtonProps {
  uuid: string;
  dwarfId: number;
}

const AddComentButton = ({ uuid, dwarfId }: AddCommentButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = async () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    return "";
  };

  return (
    <Box
      sx={{
        marginRight: "8px",
        display: "flex",
        justifyContent: "right",
      }}
    >
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          handleOpen();
        }}
        sx={{
          marginTop: 2,
          maxWidth: "250px",
          fontWeight: "bold",
          color: "red",
          borderColor: "black",
        }}
      >
        Comment
      </Button>
      <AddCommentDialog
        open={dialogOpen}
        onClose={handleClose}
        uuid={uuid}
        dwarfId={dwarfId}
      />
    </Box>
  );
};

export default AddComentButton;
