import cookie from "cookie";
import { API_URL } from "@/config";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    // console.log({ identifier, password });
    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await strapiRes.json();
    // console.log(data);

    if (strapiRes.ok) {
      // Set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      let {
        error: { status },
        error: { message },
        error: { details },
      } = data;

      if (Object.values(details).length > 0) {
        message = details.errors[0].message;
      }

      res.status(status).json({
        message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
