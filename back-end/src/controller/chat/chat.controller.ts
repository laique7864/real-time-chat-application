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
import { validationResult } from "express-validator";
import { HttpStatusCode } from "../../interfaces/httpstatus";
import { chatService } from "../../services/chat/chaService";
import SessionchatData from "../../interfaces/index";
const jwt = require("jsonwebtoken");
import mongoose from "mongoose";
class ChatController {
  constructor() {}

  async getRows(req: Request, res: Response) {
    let request_id = req.body.request_id;
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      console.log(
        request_id +
          ": chat_settings_showbyfield_validation_error: " +
          JSON.stringify(errors.array().toString())
      );
      return validationError(res, errors.array().toString());
    }

    try {
      const getRows_time = request_id + ": list_getRows_time";
      const records = await chatService.findAll(
        req.query,
        req.query.fields
      );

      if (!records) {
        console.log(request_id + ": list_getRows_error: No record found");
        return errorRes(res, "No record found", HttpStatusCode.NOT_FOUND);
      }

      //console.log(request_id + ": getRows_response: " + JSON.stringify(records));
      return successRes(res, records, HttpStatusCode.OK);
    } catch (err:any) {
      console.log(
        request_id + "chat_settings_showbyfield_error: " + err.message
      );
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
          ": chat_onboarding_validation_error: " +
          JSON.stringify(errors.array())
      );
      return validationError(res, errors.array().toString());
    }

    try {
      const findRow_time = request_id + ": getRows_time";
      console.time(findRow_time);
      const records = await chatService.findRow(req.body, req.body.fields);
      console.timeEnd(findRow_time);

      if (!records) {
        console.log(
          request_id + ": chat_onboarding_findRow_error: No record found"
        );
        return errorRes(res, "No record found", HttpStatusCode.NOT_FOUND);
      }
      console.log(
        request_id +
          ": chat_onboarding_findRow_response: " +
          JSON.stringify(records)
      );
      return successRes(res, records, HttpStatusCode.OK);
    } catch (err:any) {
      console.log(
        request_id + ": chat_onboarding_findRow_error: " + err.message
      );
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async create(req: Request, res: Response) {
    

    try {
      const NewEmpInfo: any =  {
        senderId: req.body.senderId,
        recieverId: req.body.recieverId,
        message: req.body.message,
      }
      
      let isCreated = await chatService.create(NewEmpInfo);
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
    } catch (err:any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }
  async getChats(req: Request, res: Response) {

    try {
      const { senderId, recieverId } = req.query;

        let records: any = await chatService.findAll({
          senderId,
          recieverId
        });
        
    
          return successRes(
            res,
            {
              chat:records
            },
            HttpStatusCode.OK
          );

    } catch (err:any) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }


 

 
}

export const chatController = new ChatController();
