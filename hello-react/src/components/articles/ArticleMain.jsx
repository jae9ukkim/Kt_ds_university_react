// articles.json 파일 불러오기
// articles.json를 불러와서 articleData에 넣겠다
import { useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import articleData from "./articles.json";
import ArticleWriter from "./ArticleWriter";
import ArticleWriter2 from "./ArticleWriter2";

const ArticleMain = () => {
  // state를 변경
  // 컴포넌트가 재실행. (props의 전달여부 관계 없이)
  const [articles, setArticleData] = useState(articleData.articles);

  const onSaveButtonClickHandler = (subject, name, email, content) => {
    setArticleData((prevData) => [
      ...prevData,
      {
        id: "BO-20260424-00000" + articles.length,
        subject,
        content,
        email,
        viewCnt: parseInt(Math.random() * 1000),
        crtDt: "2026-04-24 14:56:51",
        mdfyDt: "",
        fileGroupId: "",
        membersVO: { email, name },
        files: [],
      },
    ]);
  };

  // console.log(articleData);
  const [isWriteFormActive, setIsWriteFormActive] = useState(false);

  const onClickWriteFormToggleHandler = () => {
    setIsWriteFormActive((isActive) => {
      return !isActive;
    });
  };

  const writeForm =
    (!isWriteFormActive && (
      <button onClick={onClickWriteFormToggleHandler}>글쓰기</button>
    )) ||
    (isWriteFormActive && (
      <>
        <ArticleWriter2
          onClickWriterFormToggle={onClickWriteFormToggleHandler}
          onSaveButtonClick={onSaveButtonClickHandler}
        />
      </>
    ));
  return (
    <div className="wrapper">
      <div> {articles.length}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList articles={articles} />
      </table>
      <div>{writeForm}</div>
    </div>
  );
};

export default ArticleMain;
