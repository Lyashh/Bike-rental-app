import { Response, Request } from "express";

export default class BikeControoller {
  public getAll() {
    return (req: Request, res: Response) => {
      return res.json("1");
    };
  }
}
