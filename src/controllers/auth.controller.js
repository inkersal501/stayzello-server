export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.json({ message: "Logout successful" });
};
