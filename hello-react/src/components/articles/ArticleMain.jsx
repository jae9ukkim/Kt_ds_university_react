// articles.json 파일 불러오기
// articles.json를 불러와서 articleData에 넣겠다
import { useEffect, useRef, useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import ArticleWriter2 from "./ArticleWriter2";
import {
  fetchAddArticle,
  fetchArticleList,
  fetchJsonWebToken,
} from "../../http/articles/fetchArticle";
import LoginForm from "./LoginForm";
import { isString } from "../../utils/type";
import { getValidationResult } from "../../utils/errorHandler";

const ArticleMain = () => {
  // state를 변경
  // 컴포넌트가 재실행. (props의 전달여부 관계 없이)

  const [token, setToken] = useState();
  const [loginErrors, setLoginErrors] = useState();
  const id = useRef();
  const password = useRef();
  const writerRef = useRef();

  const onClickLoginButtonHandler = async () => {
    const jwt = await fetchJsonWebToken(
      id.current.value,
      password.current.value,
    );
    setToken(jwt.token);

    if (jwt.error) {
      if (isString(jwt.error)) {
        setLoginErrors(jwt.error);
      } else {
        setLoginErrors(getValidationResult(jwt.error));
      }
    }
    // TODO 로그인 실패 alert 추가하기
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

  const onSaveButtonClickHandler = async (subject, content, attachFile) => {
    const addResult = await fetchAddArticle(
      token,
      subject,
      content,
      attachFile,
    );

    if (addResult.error) {
      // alert(addResult.error);
      writerRef.current.setResponseError(addResult.error);
      return;
    }
    refreshArticlesList();
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
          errorHandleRef={writerRef}
        />
      </>
    ));
  return (
    <div className="wrapper">
      {!token && (
        <LoginForm>
          <div>
            {isString(loginErrors) && <div>{loginErrors}</div>}
            <div>
              <label htmlFor="email">ID</label>
              <input type="text" name="email" id="email" ref={id} />
              {loginErrors?.email && <div>{loginErrors.email}</div>}
            </div>
            <div>
              <label htmlFor="password">PWD</label>
              <input
                type="password"
                name="password"
                id="password"
                ref={password}
              />
              {loginErrors?.password && <div>{loginErrors.password}</div>}
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
