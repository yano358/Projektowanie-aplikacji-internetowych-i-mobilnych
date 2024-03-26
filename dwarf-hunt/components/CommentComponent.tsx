import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CommentComponentProps {
  author: string;
  comment: string;
  children?: React.ReactNode;
}

interface CommentReplyProps {
  author: string;
  comment: string;
  cutIn: number;
}

const CommentStyled = styled(Typography)({
  border: 2,
  borderColor: "black",
  borderStyle: "solid",
  padding: 5,
  margin: 6,
  borderRadius: "14px",
  fontSize: 16,
  fontFamily: "Courier New",
});

const CommentComponent: React.FC<CommentComponentProps> = ({
  author,
  comment,
  children,
}) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.500",
        borderStyle: "solid",
        padding: 1,
        margin: 1,
        borderRadius: 1,
      }}
    >
      <Box sx={{}}>
        <Typography>{author}:</Typography>
        <CommentStyled>{comment}</CommentStyled>
      </Box>
      <div>{children}</div>
    </Box>
  );
};

const CommentReply: React.FC<CommentReplyProps> = ({
  author,
  comment,
  cutIn,
}) => {
  return (
    <Box
      sx={{
        marginLeft: cutIn * 10,
      }}
    >
      <Typography
        sx={{
          border: 2,
          borderColor: "blue",
          borderStyle: "solid",
          padding: 1,
          margin: 1,
          borderRadius: "10px",
          fontSize: 12,
          fontFamily: "Courier New",
        }}
      >
        <div>{author}</div>
        <div>{comment}</div>
      </Typography>
    </Box>
  );
};

export { CommentComponent, CommentReply };
