import { Response, Request } from "express";
import RentService from "../services/db/rent.service";

export default class RentController {
  private rentService: RentService;
  constructor() {
    this.rentService = new RentService();
  }

  public create() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.rentService
        .insertOne(req.body.id) //user rent id=1
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }

  public delete() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.rentService
        .deleteOne(req.body.id) //user rent id=1
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }

  public getUserRent() {
    return (req: Request, res: Response): Promise<Response> | void => {
      this.rentService
        .updareRentAndGet() //user rent id=1
        .then((rent) => {
          return res.json(rent);
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }
}
