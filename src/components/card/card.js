import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import "./card.css"
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text?.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

export default function CardComponent({ data }) {
  return (
    <Card sx={{ height: "360px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.image}
          alt="img"
          sx={{ objectFit: "contain" }}

        />
        <Chip variant="outlined" color="secondary" label={data.category}
        id="catLabel"
          sx={{ float: "right", top: "-33px", position: "relative", right: "8px", borderRadius: "5px" }} />
        <CardContent sx={{ backgroundColor: '#f5f5f5' }}>
          <Typography gutterBottom variant="h5" component="div" id="title">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary"
            id="description"
            sx={{ overflowY: "scroll", height: "100px", marginBottom: "5px" }}>
            <ReadMore>
              {data.description}
            </ReadMore>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
