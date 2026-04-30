import { useImperativeHandle, useRef, useState } from "react";
import { Alert } from "../ui/modals";
import { isString } from "../../utils/type";
import { getValidationResult } from "../../utils/errorHandler";

const ArticleWriter2 = ({ onSaveButtonClick, errorHandleRef }) => {
  const [addError, setAddError] = useState();
  useImperativeHandle(errorHandleRef, () => {
    return {
      setResponseError(fetchError) {
        if (isString(fetchError)) {
          setAddError(fetchError);
        } else {
          setAddError(getValidationResult(fetchError));
        }
      },
    };
  });

  const subjectRef = useRef();
  const contentRef = useRef();
  const attachFileRef = useRef();
  const alertRef = useRef(); // dialog 제어

  const [viewMode, setViewMode] = useState("button");

  // 저장을 클릭하면 입력했던 값을 가져와 출력한다.
  const onSaveClickHandler = () => {
    console.log(alertRef);
    if (!subjectRef.current.value) {
      alertRef.current.showModal("제목을 입력해주세요.");
      return;
    }
    if (!contentRef.current.value) {
      alertRef.current.showModal("내용을 입력해주세요.");
      return;
    }
    console.log("subjectRef", subjectRef.current.value);
    console.log("contentRef", contentRef.current.value);
    onSaveButtonClick(
      subjectRef.current.value,
      contentRef.current.value,
      attachFileRef.current.files,
    );
    // 초기화
    subjectRef.current.value = "";
    contentRef.current.value = "";
    attachFileRef.current.value = "";
  };

  const onViewChangeButtonClickHandler = (viewName) => {
    setViewMode(viewName);
  };

  return (
    <form action="" method="post">
      {viewMode === "button" && (
        <button
          type="button"
          onClick={onViewChangeButtonClickHandler.bind(this, "form")}
        >
          글쓰기
        </button>
      )}
      {viewMode === "form" && (
        <>
          <Alert dialogRef={alertRef} />
          {isString(addError) && <div>{addError}</div>}
          <div>
            <label htmlFor="subject">제목</label>
            <input type="text" name="subject" id="subject" ref={subjectRef} />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              type="text"
              name="content"
              id="content"
              ref={contentRef}
            />
          </div>
          <div>
            <input
              type="file"
              id="file"
              title="첨부파일"
              multiple
              ref={attachFileRef}
            />
          </div>
          <input
            type="button"
            value="전송"
            // onClick={onSaveButtonClick.bind(
            //   this,
            //   subjectRef.current?.value,
            //   nameRef.current?.value,
            //   emailRef.current?.value,
            //   contentRef.current?.value,
            // )}
            onClick={onSaveClickHandler}
          />
          <button
            type="button"
            onClick={onViewChangeButtonClickHandler.bind(this, "button")}
          >
            취소
          </button>
        </>
      )}
    </form>
  );
};

export default ArticleWriter2;
