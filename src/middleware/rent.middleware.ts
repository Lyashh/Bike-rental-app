import { Response, Request, NextFunction } from "express";
import BikesService from "../services/db/bikes.service";
import RentService from "../services/db/rent.service";

export default class RentMiddleware {
  private bikesService: BikesService;
  private rentService: RentService;

  constructor() {
    this.bikesService = new BikesService();
    this.rentService = new RentService();
  }

  public createNewRent() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.body.id && typeof req.body.id == "number") {
        return this.bikesService
          .findById(req.body.id)
          .then(async (data) => {
            if (data.length > 0) {
              const inRent = await this.bikesService.oneInRent(req.body.id);
              if (inRent) {
                return res.status(422).json({
                  message: "validation error",
                  detail: `bike with id=${req.body.id} already in rent`,
                });
              }
              if (!data[0].available) {
                return res.status(422).json({
                  message: "validation error",
                  detail: `bike with id=${req.body.id} is not available`,
                });
              }
              return next();
            } else {
              return res.status(404).json({
                message: "validation error",
                detail: `bike with id=${req.body.id} does not exist`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        return res.status(400).json({
          message: "validation error",
          detail: `request must contain "id": number`,
        });
      }
    };
  }

  public deleteRent() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.body.id && typeof req.body.id == "number") {
        return this.rentService.bToRntsItemExists(req.body.id).then((data) => {
          if (data) {
            return next();
          } else {
            return res.status(422).json({
              message: "validation error",
              detail: `rent item  with id=${req.body.id} not exist`,
            });
          }
        });
      } else {
        return res.status(400).json({
          message: "validation error",
          detail: `request must contain "id": number`,
        });
      }
    };
  }
}
