// articles.json 파일 불러오기
// articles.json를 불러와서 articleData에 넣겠다
import { useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import articleData from "./articles.json";
import ArticleWriter from "./ArticleWriter";

const ArticleMain = () => {
  const [articles, setArticleData] = useState(articleData.articles);
  const [
    {
      subject,
      content,
      email: abc,
      membersVO: { email, name },
    },
    setNewArticle,
  ] = useState({
    id: "",
    subject: "",
    content: "",
    email: "",
    viewCnt: 0,
    crtDt: "",
    mdfyDt: "",
    fileGroupId: "",
    membersVO: { email: "", name: "" },
    files: [],
  });

  const onChangeSubjectHandler = (event) => {
    setNewArticle((prevData) => ({ ...prevData, subject: event.target.value }));
  };
  const onChangeEmailHandler = (event) => {
    setNewArticle((prevData) => ({
      ...prevData.membersVO,
      email: event.target.value,
    }));
  };
  const onChangeNameHandler = (event) => {
    setNewArticle((prevData) => ({
      ...prevData.membersVO,
      name: event.target.value,
    }));
  };
  const onChangeContentHandler = (event) => {
    setNewArticle((prevData) => ({ ...prevData, content: event.target.value }));
  };
  const onSaveButtonClickHandler = () => {
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
        membersVO: { email: "", name },
        files: [],
      },
    ]);
    setNewArticle({
      id: "",
      subject: "",
      content: "",
      email: "",
      viewCnt: 0,
      crtDt: "",
      mdfyDt: "",
      fileGroupId: "",
      membersVO: { email: "", name: "" },
      files: [],
    });
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
        <ArticleWriter
          onSaveButtonClick={onSaveButtonClickHandler}
          onChangeSubject={onChangeSubjectHandler}
          onChangeEmail={onChangeEmailHandler}
          onChangeName={onChangeNameHandler}
          onChangeContent={onChangeContentHandler}
          onClickWriterFormToggle={onClickWriteFormToggleHandler}
          inputData={{ subject, email, name, content }}
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
