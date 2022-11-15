import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { uuid } = req.query;

  return new Promise((resolve, reject) => {
    dbConnect().then(() => {
      User.findOne({ uuid: uuid }, (err, userData) => {
        if (err) {
          console.log(err);
        } else if (userData === null) {
          res.status(204).send();
        } else {
          res.status(200).send({ name: userData.name });
        }
        resolve();
      });
    });
  });
}
