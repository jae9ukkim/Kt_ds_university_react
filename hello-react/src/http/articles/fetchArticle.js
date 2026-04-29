export const fetchArticleList = async (pageNo = 0, listSize = 10) => {
  try {
    const fetchResult = await fetch(
      `http://localhost:8080/api/articles?pageNo=${pageNo}&listSize=${listSize}`,
      {
        method: "get",
      },
    );
    const jsonResult = await fetchResult.json();
    // console.log(jsonResult.result);
    return jsonResult;
  } catch (e) {
    return {
      result: { count: 0, result: [] },
      pagination: {},
      error: "서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.",
    };
  }
};

// jwt 받아오기
export const fetchJsonWebToken = async (id, password) => {
  const loginResult = await fetch("http://localhost:8080/api/authorization", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: id, password }),
  });
  const jwt = await loginResult.json();
  return jwt;
};

// 인증 정보 필요.
export const fetchAddArticle = async () => {
  const fetchResult = await fetch(`http://192.168.211.26:8080/api/articles`, {
    method: "post",
  });
  fetchArticleList();
  const jsonResult = fetchResult.json();
};
