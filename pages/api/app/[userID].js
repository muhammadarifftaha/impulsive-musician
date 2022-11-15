import dbConnect from "../../../lib/dbConnect";
import Progression from "../../../models/Progressions";

export default async function handler(req, res) {
  const { userID: uuid } = req.query;

  return new Promise((resolve, reject) => {
    dbConnect().then(() => {
      Progression.find({ userID: uuid })
        .then((collection) => {
          res.status(200).send(collection);
          resolve();
        })
        .catch((error) => {
          res.send({ error });
          resolve();
        });
    });
  });
}
