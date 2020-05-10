import { Router as ExpressRouter } from "express";
import BikeMiddleware from "../middleware/bikes.middleware";
import BikeContoller from "../controllers/bike.controller";

export default class BikeRouter {
  private router: ExpressRouter;
  private bikeController: BikeContoller;
  private bikeMiddleware: BikeMiddleware;

  constructor() {
    this.bikeMiddleware = new BikeMiddleware();
    this.bikeController = new BikeContoller();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.bikeController.getAll());
    this.router.get("/categories", this.bikeController.getCatgs());

    this.router.post(
      "/",
      this.bikeMiddleware.validateNewBike(),
      this.bikeMiddleware.validateCategoryExist(),
      this.bikeController.create()
    );

    this.router.patch(
      "/",
      this.bikeMiddleware.updateSetNotAwailable(),
      this.bikeController.setNotAvailable()
    );

    this.router.get("/available", this.bikeController.byAvailable());
    return this.router;
  }
}
