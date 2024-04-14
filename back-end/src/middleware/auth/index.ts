import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorRes, unauthorized } from "../../helper/apiResponse";
import { userService } from "../../services/user/userService";
class AuthHandler {
  constructor() {}

  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    
    const token: any = req.headers.authorization;
    // console.log(req.session);
    if (!token)
      return errorRes(res, "Authorization token is missing or Invalid");

    let isValidToken = await this.validateAccessToken(token);

    if (!isValidToken)
      return errorRes(res, "Authorization token is missing or Invalid");

    let user = await userService.findRow({
      _id: isValidToken.userId,
    });
    
    if (!user) return unauthorized(res, "Invalid User id");


    req.query.token = token;
    req.body.token = token;

    return next();
  };

  validateAccessToken = async (token: string) => {
    try {
      const decoded: any = jwt.verify(token, "secret");
      return decoded;
    } catch (err:any) {
      console.log(err.message);
      return false;
    }
  };
}

export const auth = new AuthHandler().verifyToken;
