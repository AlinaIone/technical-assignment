import React, { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { toggleFavorite, getFavoriteMovies } from "../services/apiRequests";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";
import { Button, CardActions, IconButton } from "@mui/material";

const pulseStyle ={ 
  '@keyframes pulse': {
   '0%': {
     transform: 'scale(1)'
   },
   '50%': {
     transform: 'scale(1.1)'
   },
   '100%': {
     transform: 'scale(1)'
   },
  animation: '$pulse 1s infinite',
}}
const buttonStyle = {
  backgroundColor:'#FFFFFF ',
  '&:hover': {
    backgroundColor: '#D3D3D3',
  },
  zIndex:10,
  position: 'absolute', top: 10, right: 10,  
}


const FavoriteButton = ({ movieId, isFav, nativeButton}) => {
  const dispatch = useDispatch();
  const [isPulsing, setIsPulsing] = useState(false);

  const handleToggleToFavorite = async (id, isFavParam) => {
      setIsPulsing(true);
      try {
        const response = await toggleFavorite(id, isFavParam);
        if (response.success) {
          const favMovieList = await getFavoriteMovies();
          dispatch(storeActions.movies.setFavoriteMovies(favMovieList.results));
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
      setIsPulsing(false);
    }

  return (
    <>
      {nativeButton ? (
        <CardActions aria-label={isFav ? "remove-fav" : "add-fav"} sx={{justifyContent:'center', color:'#e6e6fa'}}>
          <Button onClick={() => handleToggleToFavorite(movieId, !isFav)}  sx={{ color:'#e6e6fa'}} size="medium"   endIcon={ <StarIcon fontSize="large" sx={{ color: "#FFD700" }} />}>
            {isFav ? "Remove" :"Add" }
          </Button>
         </CardActions>
      ) : (
        <IconButton
          aria-label={isFav ? "remove-fav" : "add-fav"}
          size="small"
          sx={isPulsing ? { ...pulseStyle, ...buttonStyle } : buttonStyle}
          onClick={() => handleToggleToFavorite(movieId, !isFav)}
        >
          {isFav ? (
            <StarIcon fontSize="large" sx={{ color: "#FFD700" }} />
          ) : (
            <StarBorderIcon fontSize="large" />
          )}
        </IconButton>
      )}
    </>
  );
};

export default FavoriteButton;
