// articles.json 파일 불러오기
// articles.json를 불러와서 articleData에 넣겠다
import { useEffect, useRef, useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import ArticleWriter2 from "./ArticleWriter2";
import {
  fetchArticleList,
  fetchJsonWebToken,
} from "../../http/articles/fetchArticle";
import LoginForm from "./LoginForm";

const ArticleMain = () => {
  // state를 변경
  // 컴포넌트가 재실행. (props의 전달여부 관계 없이)

  const [token, setToken] = useState();
  const id = useRef();
  const password = useRef();

  const onClickLoginButtonHandler = async () => {
    const jwt = await fetchJsonWebToken(
      id.current.value,
      password.current.value,
    );
    setToken(jwt.token);
    // console.log(jwt);
    const loginInfo = JSON.parse(atob(jwt.token.split(".")[1]));
    console.log(loginInfo);
  };

  const [viewPageNo, setViewPageNo] = useState(0);

  const onPaginationButtonClickHandler = (nextPageNo) => {
    setViewPageNo(nextPageNo);
  };

  const [
    {
      count,
      result: articles,
      pagination: { pageNo = 0, pageCount = 0 },
    },
    setArticleData,
  ] = useState({
    count: 0,
    result: [],
    pagination: {},
  });

  const refreshArticlesList = async () => {
    const articleList = await fetchArticleList(viewPageNo);

    const {
      result: { count, result },
      pagination,
    } = articleList;

    if (!articleList.error) {
      setArticleData({ count, result, pagination });
    } else {
      alert(articleList.error);
    }
  };

  useEffect(() => {
    refreshArticlesList();
  }, [viewPageNo]);

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
      {!token && (
        <LoginForm>
          <div>
            <div>
              <label htmlFor="email">ID</label>
              <input type="text" name="email" id="email" ref={id} />
            </div>
            <div>
              <label htmlFor="password">PWD</label>
              <input
                type="password"
                name="password"
                id="password"
                ref={password}
              />
            </div>
            <button type="button" onClick={onClickLoginButtonHandler}>
              로그인
            </button>
          </div>
        </LoginForm>
      )}
      <div> {count}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList articles={articles} />
      </table>
      <div>
        {pageNo > 0 && (
          <button
            onClick={onPaginationButtonClickHandler.bind(this, pageNo - 1)}
          >
            이전
          </button>
        )}
        {pageCount - 1 > pageNo && (
          <button
            onClick={onPaginationButtonClickHandler.bind(this, pageNo + 1)}
          >
            다음
          </button>
        )}
      </div>
      <div>{writeForm}</div>
    </div>
  );
};

export default ArticleMain;
