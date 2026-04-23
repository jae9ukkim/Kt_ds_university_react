const ArticleList = ({ articles }) => {
  return (
    <tbody>
      {articles.map((article) => (
        <tr>
          <td>{article.id}</td>
          <td>
            <a href="">{article.subject}</a>
          </td>
          <td>{article.email}</td>
          <td>{article.membersVO.name}</td>
          <td>{article.viewCnt}</td>
          <td>{article.crtDt}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ArticleList;
