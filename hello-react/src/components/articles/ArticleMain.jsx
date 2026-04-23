// articles.json 파일 불러오기
// articles.json를 불러와서 articleData에 넣겠다
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import articleData from "./articles.json";
import ArticleWriter from "./ArticleWriter";

const ArticleMain = () => {
  console.log(articleData);
  return (
    <div className="wrapper">
      <div> {articleData.articles.length}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList articles={articleData.articles} />
      </table>
      <div>
        <ArticleWriter />
      </div>
    </div>
  );
};

export default ArticleMain;
