import express from "express";
import { userController } from "../../controller/user/user.controller";
import { userValidation } from "../../middleware/user.validation";
import { auth } from "../../middleware/auth/index";
import { userService } from "../../services/user/userService";
import { sanitizeAllowedFields } from "../../helper/basic";

export const userRouter = express.Router();

userRouter.get(
  "/list",
  auth,
  (req: express.Request, res: express.Response) => {
    userController.getRows(req, res);
  }
);

// customerRouter.post(
//   "/find",
//   auth,
//   (req: express.Request, res: express.Response, next: express.NextFunction) =>
//     modifyRequestMiddleware.requestModify(req, res, next),
//   customerValidation.checkUser(),

//   (req: express.Request, res: express.Response) => {
//     const notAllowedFields = sabzcorp_notAllowed_fileds.customer_show;
//     const requestedFields: any = req.query.fields || req.body.fields;
//     const defaultFields: any = customerService.DEFAULT_FIELDS;
//     req.body.fields = sanitizeAllowedFields(
//       defaultFields,
//       notAllowedFields,
//       requestedFields
//     );
//     customerController.findRow(req, res);
//   }
// );

userRouter.get(
  "/detail",
  auth,
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    userValidation.checkUser(),

  (req: express.Request, res: express.Response) => {
    const requestedFields: any = req.query.fields || req.body.fields;
    userController.customerDetail(req, res);
  }
);
userRouter.post(
  "/create",
  (req: express.Request, res: express.Response) => {
    userController.create(req, res);
  }
);

userRouter.post(
  "/login",
  (req: express.Request, res: express.Response) => {
    userController.login(req, res);
  }
);

