class ErrorLikeAxios extends Error {
  constructor(message, response) {
    super(message);
    this.response = {
      status: response.status,
      ok: response.ok,
      headers: response.headers,
      statusText: response.statusText,
      url: response.url,
    };
  }
}

async function fetchLikeAxios(path, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const response = await fetch(path, mergedOptions);

  if (!response.ok) {
    // native fetch does not throw Errors for any HTTP statuses (4xx and 5xx) so here we mimic axios
    // by throwing an error for anything that is not a 2xx status, and adding more data to the Error
    const errorMessage = await response.text().catch(console.error);
    const msg = errorMessage || `${response.status} ${response.statusText}`;
    throw new ErrorLikeAxios(msg, response);
  }

  return response;
}

const LEETCODE_BASE_URL = "https://leetcode.com";
const LEETCODE_ALL_QUESTION_URL = `${LEETCODE_BASE_URL}/api/problems/all/`;

async function getQuestion(id) {
  try {
    const response = await fetchLikeAxios(LEETCODE_ALL_QUESTION_URL);
    const data = await response.json();
    const question = data.stat_status_pairs.find((pair) => {
      pair.stat.frontend_question_id === id;
    });
    if (question) {
      return {
        title: question.stat.question__article__slug,
        url: `${LEETCODE_BASE_URL}/problems/${question.stat.question__title_slug}/`,
      };
    }
  } catch (e) {
    console.error("Error finding question id", id, e.message);
  }
}

module.exports = getQuestion;
