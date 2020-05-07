import { Response, Request } from "express";
import BikesService, { Bike } from "../services/db/bikes.service";

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

  public create() {
    return (req: Request, res: Response) => {
      const newBike: Bike = {
        title: req.body.title,
        category_id: req.body.category_id,
        price: req.body.price,
        inRent: false,
        rent_id: null,
      };
      this.bikeService
        .insert(newBike)
        .then((newBike) => {
          res.json(newBike[0]);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    };
  }
}
