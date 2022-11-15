import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const data = req.body.email;

  return new Promise((resolve, reject) => {
    User.findOne({ email: data }, (err, userData) => {
      if (err) {
        console.log(err);
      } else if (userData === null) {
        res.status(204).send();
      } else {
        res.status(200).send({ email: userData.email, name: userData.name });
      }
      resolve();
    });
  });
}
