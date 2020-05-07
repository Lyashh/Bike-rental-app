import { Response, Request } from "express";
import RentService from "../services/db/rent.service";

export default class RentController {
  private rentService: RentService;
  constructor() {
    this.rentService = new RentService();
  }

  public create() {
    return (req: Request, res: Response) => {
      return this.rentService
        .insertOne(req.body.id)
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }
}
