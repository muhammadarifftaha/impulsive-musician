export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).send("HELLO");
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;

    default:
      break;
  }
  req.statusCode = 200;
}
