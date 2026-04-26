const ArticleWriter = ({
  onSaveButtonClick,
  onChangeSubject,
  onChangeEmail,
  onChangeName,
  onChangeContent,
  onClickWriterFormToggle,
  inputData: { subject, email, name, content },
}) => {
  return (
    <form action="" method="post">
      <div>
        <label htmlFor="subject">제목</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={subject}
          onChange={onChangeSubject}
        />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChangeName}
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          type="text"
          name="content"
          id="content"
          value={content}
          onChange={onChangeContent}
        />
      </div>
      <input type="button" value="전송" onClick={onSaveButtonClick} />
      <input type="button" value="취소" onClick={onClickWriterFormToggle} />
    </form>
  );
};

export default ArticleWriter;
