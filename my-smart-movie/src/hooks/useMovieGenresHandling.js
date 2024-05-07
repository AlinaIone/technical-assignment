import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useMovieGenresHandling = () => {
  const [genreMap, setGenreMap] = useState({});
  const genreList = useSelector((store) => store.configuration.genres);

  useEffect(() => {
    // Create a genre map when the genre list changes
    if (genreList) {
      const map = {};
      genreList.forEach((genre) => {
        map[genre.id] = genre.name;
      });
      setGenreMap(map);
    }
  }, [genreList]);

  return genreMap;
};
