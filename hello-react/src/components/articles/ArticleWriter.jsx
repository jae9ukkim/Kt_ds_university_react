const ArticleWriter = () => {
  return (
    <form action="" method="post">
      <div>
        <label htmlFor="subject">제목</label>
        <input type="text" name="subject" id="subject" />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea type="text" name="content" id="content" />
      </div>
      <input type="button" value="전송" />
    </form>
  );
};

export default ArticleWriter;
