const axios = require("axios");

const clientId = "clientId";
const clientSecret = "clientSecret";
const redirectUri = "http://localhost:8000/redirect";
let accessToken = null;

async function getAccessToken(authorizationCode) {
  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code: authorizationCode,
          scope: "talk_message",
        },
      }
    );

    accessToken = tokenResponse.data.access_token;
    console.log("액세스 토큰 요청 성공");
    return accessToken;
  } catch (error) {
    console.error("액세스 토큰 요청 실패:", error.response.data);
    throw new Error("액세스 토큰 요청 실패");
  }
}

module.exports = {
  getAccessToken,
};
