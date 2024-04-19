import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MovieCard = ({ title, image, descriprion }) => {
  return (
    <Card sx={{ maxWidth: 250, margin: "0.5rem" }}>
      <CardMedia
        sx={{ height: 350 }}
        // style={{ display: 'block', margin: 'auto' }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descriprion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default MovieCard;
