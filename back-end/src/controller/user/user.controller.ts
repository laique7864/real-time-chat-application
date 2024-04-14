import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(__dirname, "../../../.env");
const envFile = fs.readFileSync(envPath, "utf8");
const envVariables = envFile.split("\n");

envVariables.forEach((envVar) => {
  const [key, value] = envVar.split("=");
  process.env[key] = value;
});
const NODE_ENVIRONMENT = process.env.NODE_ENV;

import { Request, Response } from "express";
import {
  errorRes,
  successRes,
  validationError,
  unauthorized,
} from "../../helper/apiResponse";
import { generateUniqueRandomNumber } from "../../helper/basic";
import { validationResult } from "express-validator";
import { HttpStatusCode } from "../../interfaces/httpstatus";
import { userService } from "../../services/user/userService";
import SessionUserData from "../../interfaces/index";
const jwt = require("jsonwebtoken");
import mongoose from "mongoose";
import { UserCreateAttributes } from "../../../src/interfaces/user";
class UserController {
  constructor() {}

  async getRows(req: Request, res: Response) {
    try {
      const records = await userService.findAll();

      if (!records) {
        return errorRes(res, "No record found", HttpStatusCode.NOT_FOUND);
      }

      //console.log(request_id + ": getRows_response: " + JSON.stringify(records));
      return successRes(res, records, HttpStatusCode.OK);
    } catch (err: any) {
      console
        .log
        // request_id + "user_settings_showbyfield_error: " + err.message
        ();
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async findRow(req: Request, res: Response) {
    let request_id = req.body.request_id;
    console.log(request_id + ": find_request: " + JSON.stringify(req.body));

    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      console.log(
        request_id +
          ": user_onboarding_validation_error: " +
          JSON.stringify(errors.array())
      );
      return validationError(res, errors.array().toString());
    }

    try {
      const findRow_time = request_id + ": getRows_time";
      console.time(findRow_time);
      const records = await userService.findRow(req.body, req.body.fields);
      console.timeEnd(findRow_time);

      if (!records) {
        console.log(
          request_id + ": user_onboarding_findRow_error: No record found"
        );
        return errorRes(res, "No record found", HttpStatusCode.NOT_FOUND);
      }
      console.log(
        request_id +
          ": user_onboarding_findRow_response: " +
          JSON.stringify(records)
      );
      return successRes(res, records, HttpStatusCode.OK);
    } catch (err: any) {
      console.log(
        request_id + ": user_onboarding_findRow_error: " + err.message
      );
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async create(req: Request, res: Response) {
    console.log(req);

    try {
      const NewEmpInfo: UserCreateAttributes = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
      };
      let isCreated = await userService.create(NewEmpInfo);
      if (!isCreated) {
        return errorRes(res, "No Record saved", HttpStatusCode.BAD_REQUEST);
      }
      if (isCreated["id"]) {
        return successRes(
          res,
          isCreated.id
            ? "Record created successfully."
            : "Unable to create the records.",
          HttpStatusCode.OK
        );
      }
      return successRes(
        res,
        NewEmpInfo
          ? "Record created successfully."
          : "Unable to create the records.",
        HttpStatusCode.OK
      );
      //   return errorRes(res, NewEmpInfo, HttpStatusCode.BAD_REQUEST);
    } catch (err: any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async login(req: Request, res: Response) {
    try {
      // const findRow_time = request_id + ": getRows_time";
      // console.time(findRow_time);
      const { email, userName } = req.body;

      let records: any = await userService.findRow(req.body);
console.log(records);

      if (!records) {
    return    errorRes(
          res,
          "User Not Found or PasswordIncreact",
          HttpStatusCode.NOT_FOUND
        );
      }
      let userId = records._id || "";
      console.log(userId)
      const accessToken = jwt.sign({ userName, userId }, "secret");
      const userData: SessionUserData = {
        userId: records._id,
        token: accessToken,
      };
console.log(userData);

      req.session.user = userData;
      return successRes(
        res,
        {
          message: "Login successful",
          token: accessToken,
          user: records,
        },
        HttpStatusCode.OK
      );
    } catch (err: any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async userVerifyOTP(req: Request, res: Response) {
    let request_id = req.body.request_id;
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return validationError(res, errors.array().toString());
    }

    try {
      const { OTP, phone } = req.body;
      if (req.session.user) {
        const accessToken = jwt.sign(
          { phone },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.JWT_TOKEN_EXPIRE }
        );
        req.session.user["token"] = accessToken;

        return successRes(
          res,
          {
            message: "Login successful",
            token: req.session.user["token"],
          },
          HttpStatusCode.OK
        );
      } else {
        return errorRes(
          res,
          "MobileNo/Invalid OTP, Retry Again",
          HttpStatusCode.BAD_REQUEST
        );
      }
    } catch (err: any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async customerDetail(req: Request, res: Response) {
    let request_id = req.body.request_id;
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      return validationError(res, errors.array().toString());
    }

    try {
      const records: any = await userService.findRow({
        _id: req.body.user_id,
      });
      if (!records) {
        return errorRes(res, "No record found", HttpStatusCode.NOT_FOUND);
      }
      return successRes(res, records, HttpStatusCode.OK);
    } catch (err: any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }

  async logOut(req: Request, res: Response) {
    try {
      req.session.destroy((err) => {
        console.log(err);

        return errorRes(res, err, HttpStatusCode.BAD_REQUEST);
      });

      return successRes(res, HttpStatusCode.OK);
    } catch (err: any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
}

export const userController = new UserController();
