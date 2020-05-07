import { Response, Request, NextFunction } from "express";
import CategoryService from "../services/db/category.service";
import BikesService from "../services/db/bikes.service";
import Validation from "../services/validation/joi";

export default class RoleMiddleware {
  private categoryService: CategoryService;
  private bikesService: BikesService;
  constructor() {
    this.categoryService = new CategoryService();
    this.bikesService = new BikesService();
  }

  public validateCategoryExist() {
    return (req: Request, res: Response, next: NextFunction) => {
      return this.categoryService
        .findById(req.body.category_id)
        .then((data) => {
          if (data.length > 0) {
            return next();
          } else {
            return res.status(422).json({
              message: "validation error",
              detail: `category with id=${req.body.category_id} does not exist`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    };
  }

  public validateBikeIdExist() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.body.id && typeof req.body.id == "number") {
        return this.bikesService
          .findById(req.body.id)
          .then((data) => {
            if (data.length > 0) {
              return next();
            } else {
              return res.status(422).json({
                message: "validation error",
                detail: `bike with id=${req.body.id} does not exist`,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        return res.status(422).json({
          message: "validation error",
          detail: `request must contain "id" and be number`,
        });
      }
    };
  }

  public validateNewBike() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const validResult = await Validation.newBike(req.body);
      if (validResult.error) {
        return res.status(422).json({
          detail: validResult.error.details[0],
          message: "validation fails",
        });
      } else {
        return next();
      }
    };
  }
}
