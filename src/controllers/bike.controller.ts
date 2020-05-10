import { Response, Request } from "express";
import BikesService, { Bike } from "../services/db/bikes.service";

export default class BikeControoller {
  private bikeService: BikesService;
  constructor() {
    this.bikeService = new BikesService();
  }

  public getAll() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.bikeService
        .selectAll()
        .then((bikes) => {
          return res.json(bikes);
        })
        .catch((err) => {
          return res.status(500).json({ err });
        });
    };
  }

  public create() {
    return (req: Request, res: Response): Promise<Response> => {
      const newBike: Bike = {
        title: req.body.title,
        category_id: req.body.category_id,
        price: req.body.price,
      };
      return this.bikeService
        .insert(newBike)
        .then((newBike) => {
          return res.json(newBike);
        })
        .catch((err) => {
          return res.status(500).json({ err });
        });
    };
  }

  public setNotAvailable() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.bikeService
        .updateToNotAvailable(req.body.id)
        .then((data) => {
          if (data === 1) {
            return res.json({
              message: "success set to not awailable list",
              success: true,
            });
          } else {
            return res.status(500).json({ err: data, success: false });
          }
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }

  public byAvailable() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.bikeService
        .available()
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }

  public getCatgs() {
    return (req: Request, res: Response): Promise<Response> => {
      return this.bikeService
        .bikesCatgs()
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => res.status(500).json({ err }));
    };
  }
}
