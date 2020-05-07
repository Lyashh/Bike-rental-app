import { Router as ExpressRouter } from "express";
import BikeContoller from "../controllers/bike.controller";

export default class RootRouter {
  private router: ExpressRouter;
  private bikeController: BikeContoller;

  constructor() {
    this.bikeController = new BikeContoller();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.bikeController.getAll());
    return this.router;
  }
}
