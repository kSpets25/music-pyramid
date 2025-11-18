import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session";
import dbConnect from "../../db/connection";
import Band from "../../db/models/bands";


export default withIronSessionApiRoute(async function deleteBand(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const user = req.session.user;
  if (!user) return res.status(401).json({ message: "Not logged in" });

  const { id } = req.query;

  await dbConnect();

  const result = await Band.deleteOne({ _id: id, userId: user.id || user._id });

  if (result.deletedCount === 1) {
    return res.status(200).json({ message: "Deleted" });
  } else {
    return res.status(404).json({ message: "Band not found" });
  }
}, sessionOptions);
