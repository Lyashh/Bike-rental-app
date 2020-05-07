import { Response, Request, NextFunction } from "express";
import BikesService from "../services/db/bikes.service";
import Validation from "../services/validation/joi";

export default class RentMiddleware {
  private bikesService: BikesService;
  constructor() {
    this.bikesService = new BikesService();
  }

  public createNewRent() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.body.id && typeof req.body.id == "number") {
        return this.bikesService
          .findById(req.body.id)
          .then((data) => {
            if (data.length > 0) {
              console.log(data);
              if (data[0].inRent) {
                return res.status(422).json({
                  message: "validation error",
                  detail: `bike with id=${req.body.id} already in rent`,
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
}
