const TrendItem = ({ movie }) => {
  return (
    <div>
      <img src={movie.poster} />
      <div>{movie.name}</div>
      <div>{movie.openDate}</div>
    </div>
  );
};

export default TrendItem;
