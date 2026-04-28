import { useRef, useState } from "react";
import { Alert } from "../ui/modals";

const ArticleWriter2 = ({ onSaveButtonClick }) => {
  const subjectRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const contentRef = useRef();
  const alertRef = useRef(); // dialog 제어

  const [viewMode, setViewMode] = useState("button");

  // 저장을 클릭하면 입력했던 값을 가져와 출력한다.
  const onSaveClickHandler = () => {
    console.log(alertRef);
    if (!subjectRef.current.value) {
      alertRef.current.showModal("제목을 입력해주세요.");
      return;
    }
    if (!nameRef.current.value) {
      alertRef.current.showModal("이름을 입력해주세요.");
      return;
    }
    if (!emailRef.current.value) {
      alertRef.current.showModal("이메일을 입력해주세요.");
      return;
    }
    if (!contentRef.current.value) {
      alertRef.current.showModal("내용을 입력해주세요.");
      return;
    }
    console.log("subjectRef", subjectRef.current.value);
    console.log("nameRef", nameRef.current.value);
    console.log("emailRef", emailRef.current.value);
    console.log("contentRef", contentRef.current.value);
    onSaveButtonClick(
      subjectRef.current.value,
      nameRef.current.value,
      emailRef.current.value,
      contentRef.current.value,
    );
    // 초기화
    subjectRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";
    contentRef.current.value = "";
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
          <div>
            <label htmlFor="subject">제목</label>
            <input type="text" name="subject" id="subject" ref={subjectRef} />
          </div>
          <div>
            <label htmlFor="email">이메일</label>
            <input type="email" name="email" id="email" ref={emailRef} />
          </div>
          <div>
            <label htmlFor="name">이름</label>
            <input type="text" name="name" id="name" ref={nameRef} />
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
