const TrendHeader = ({ children, section }) => {
  return (
    <>
      <b>{section}</b>
      {children}
    </>
  );
};

export default TrendHeader;
