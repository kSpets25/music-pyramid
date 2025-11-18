import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session";
import dbConnect from "../../db/connection";
import Band from "../../db/models/bands";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { name, image, wiki, youtube, teaser } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Band name is required" });
  }

  try {
    await dbConnect();

    // Save band with userId
    const newBand = await Band.create({
      userId: user.id || user._id, // ensure session has id
      name,
      image,
      wiki,
      youtube,
      teaser,
    });

    return res.status(200).json({ success: true, band: newBand });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save band" });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
