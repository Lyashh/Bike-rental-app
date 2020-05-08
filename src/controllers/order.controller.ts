import { Response, Request } from "express";
import OrderService from "../services/db/rent.service";

export default class OrderController {
  private orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }
}
