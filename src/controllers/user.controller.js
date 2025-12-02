import { NODE_ENV } from "../config.js";
import {
  userRegisterService,
  userLoginService,
} from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const result = await userRegisterService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await userLoginService(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production"?"none": "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production"?"none": "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Logged in successfully",
      user,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};