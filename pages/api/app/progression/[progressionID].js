import dbConnect from "../../../../lib/dbConnect";
import Progression from "../../../../models/Progressions";

export default async function handler(req, res) {
  const { progressionID: uuid } = req.query;
  await dbConnect();

  switch (req.method) {
    case "GET":
      return new Promise((resolve, reject) => {
        Progression.findOne({ uuid: uuid })
          .then((progression) => {
            res.status(200).send(progression);
            resolve();
          })
          .catch((error) => {
            res.send({ error });
            resolve();
          });
      });
      break;
    case "DELETE":
      return new Promise((resolve, reject) => {
        Progression.findOneAndRemove({ uuid: uuid })
          .then((deletedProgression) => {
            res.status(200).send("Delete Successful");
            resolve();
          })
          .catch((err) => {
            res.status(204).send(err);
            resolve();
          });
      });
      break;
  }
}
