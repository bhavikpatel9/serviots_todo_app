import { JwtPayload } from "jsonwebtoken";
import { ITokenPayload } from "../../utils";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload | JwtPayload;
    }
  }
}

export {};
