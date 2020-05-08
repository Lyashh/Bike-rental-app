import { Router as ExpressRouter } from "express";
import RentContoller from "../controllers/rent.controller";
import RentMiddleware from "../middleware/rent.middleware";

export default class BikeRouter {
  private router: ExpressRouter;
  private rentContoller: RentContoller;
  private rentMiddleware: RentMiddleware;

  constructor() {
    this.rentContoller = new RentContoller();
    this.rentMiddleware = new RentMiddleware();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.post(
      "/",
      this.rentMiddleware.createNewRent(),
      this.rentContoller.create()
    );

    this.router.delete(
      "/",
      this.rentMiddleware.deleteRent(),
      this.rentContoller.delete()
    );

    this.router.get("/", this.rentContoller.getUserRent());
    return this.router;
  }
}
