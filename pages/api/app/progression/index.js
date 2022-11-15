import Progression from "../../../../models/Progressions";
import dbConnect from "../../../../lib/dbConnect";
import { generateCustomUuid } from "custom-uuid";

export default async function handler(req, res) {
  await dbConnect();
  const data = req.body;

  switch (req.method) {
    case "POST":
      data.uuid = generateCustomUuid(process.env.UUID_DICTIONARY, 6);
      return new Promise((resolve, reject) => {
        Progression.create(data)
          .then((createdProgression) => {
            res.status(201).send(createdProgression);
            resolve();
          })
          .catch((err) => {
            res.send(err);
            resolve();
          });
      });
      break;

    case "PUT":
      return new Promise((resolve, reject) => {
        Progression.findOneAndUpdate(
          { uuid: data.uuid },
          {
            name: data.name,
            tempo: data.tempo,
            instrument: data.instrument,
            chords: data.chords,
          }
        )
          .then((updatedProgression) => {
            res.status(200).send(updatedProgression);
            resolve();
          })
          .catch((err) => {
            res.send(err);
            resolve();
          });
      });
      break;
  }
}
