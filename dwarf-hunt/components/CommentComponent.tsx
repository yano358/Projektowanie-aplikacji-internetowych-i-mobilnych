import { Box, Typography } from "@mui/material";

interface CommentComponentProps {
  author: string;
  comment: string;
  children?: React.ReactNode;
}

interface CommentReplyProps {
  author: string;
  comment: string;
  cutIn: number;
  children?: React.ReactNode;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  author,
  comment,
  children,
}) => {
  return (
    <Box>
      {comment}
      <div>{author}</div>
      <div>{children}</div>
    </Box>
  );
};

const CommentReply: React.FC<CommentReplyProps> = ({
  author,
  comment,
  cutIn,
  children,
}) => {
  return (
    <Box
      sx={{
        marginLeft: cutIn * 10,
      }}
    >
      {comment} <div>{author}</div>
      <div>{children}</div>
    </Box>
  );
};

export { CommentComponent, CommentReply };
