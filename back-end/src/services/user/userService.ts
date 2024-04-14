import { UserModel } from "../../../src/models/userModel";
class UserService {
  DEFAULT_FIELDS: string =
    "firstName lastName userName phone email photo address role verify createdAt updatedAt";

  async findRow(conditions: any = [], fields: string = "") {

    try {
      const record = await UserModel.findOne(conditions);

      return record;
    } catch (err: any) {
      console.log(err);

      return false;
    }
  }

  async findById(id: string, fields: string = "") {
    try {
      const record = await UserModel.findById(id)
        .select(fields || this.DEFAULT_FIELDS)
        .lean();
      // .exec();
      return record;
    } catch (err: any) {
      return false;
    }
  }
  async findAll(condition: any = {}, fields: any = "") {
    try {
      const record = await UserModel.find(condition)
        .select(fields || this.DEFAULT_FIELDS)
        .sort("-createdAt")
        .lean();
      // .exec();
      return record;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }
  async create(data: any) {
    const doc = new UserModel(data);
    try {
      await doc.save();
      return doc;
    } catch (err: any) {
      if (err) {
        const duplicateField = Object.keys(err.keyValue)[0];
        const errorMessage = `${duplicateField} already exists.`;
        return errorMessage;
      }
      return err.errors.type.message || err.message;
    }
  }

  async update(id: string, data: any) {
    try {
      const update = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return update;
    } catch (err: any) {
      return false;
    }
  }

  async remove(id: string) {
    try {
      const removed = await UserModel.findByIdAndDelete(id, { new: true });
      return removed;
    } catch (err: any) {
      return false;
    }
  }
}

export const userService = new UserService();
