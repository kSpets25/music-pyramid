import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session";
import dbConnect from "../../db/connection";
import Band from "../../db/models/bands";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req, res) {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: "Not logged in" });

  await dbConnect();

  const bands = await Band.find({ userId: user.id }).sort({ createdAt: -1 });

  res.json({ bands });
}
