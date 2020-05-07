import { Response, Request, NextFunction } from "express";
import CategoryService from "../services/db/category.service";
import Validation from "../services/validation/joi";

export default class RoleMiddleware {
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
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
