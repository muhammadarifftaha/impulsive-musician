import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import bcrypt from "bcrypt";
import { generateStrongCompactUuid } from "custom-uuid";

const saltRounds = parseInt(process.env.SALT_ROUNDS);
const salt = bcrypt.genSaltSync(saltRounds);

export default async function handler(req, res) {
  await dbConnect();
  const data = req.body;

  return new Promise((resolve, reject) => {
    data.password = bcrypt.hashSync(data.password, salt);
    data.uuid = generateStrongCompactUuid();

    User.create(data)
      .then((createdUserData) => {
        if (createdUserData) {
          res.status(201).send({ createdUserData });
        } else {
          res.status(304).send({ createdUserData });
        }
        resolve();
      })
      .catch((err) => {
        res.status(405).send(err).end();
        resolve();
      });
  });
}
