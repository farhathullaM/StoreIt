const getAccessToken = (): string | null => localStorage.getItem("accessToken");

const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken ");

const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

const setRefreshToken = (token: string) =>
  localStorage.setItem("refreshToken", token);

const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
};
