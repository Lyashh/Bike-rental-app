import { Response, Request } from "express";
import BikesService from "../services/db/bikes.service";

export default class BikeControoller {
  private bikeService: BikesService;
  constructor() {
    this.bikeService = new BikesService();
  }
  public getAll() {
    return (req: Request, res: Response) => {
      return this.bikeService
        .selectAll()
        .then((bikes) => {
          res.json(bikes);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    };
  }
}
