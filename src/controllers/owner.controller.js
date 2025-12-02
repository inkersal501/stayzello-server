import { NODE_ENV } from "../config.js";
import {
  ownerRegisterService,
  ownerLoginService,
} from "../services/owner.service.js";

export const registerOwner = async (req, res) => {
  try {
    const result = await ownerRegisterService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginOwner = async (req, res) => {
  try {
    const { owner, accessToken, refreshToken } = await ownerLoginService(req.body);

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",        // use false in localhost if needed
      sameSite: NODE_ENV === "production"?"none": "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production"?"none": "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Logged in successfully",
      owner,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
