import { Card, CardContent, Typography } from "@mui/material";

interface DwarfCardComponentProps {
  name: string;
  description: string;
}

const DwarfCardComponent: React.FC<DwarfCardComponentProps> = ({
  name,
  description,
}) => {
  return (
    <Card sx={{ width: "60%", margin: "0 auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DwarfCardComponent;
