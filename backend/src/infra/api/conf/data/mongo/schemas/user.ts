import mongoose, { Document, Schema, model } from "mongoose";
import { User } from "../../../../../../domain/user/entity/user.entity";
import { EntityDB } from "../../../../../shared/constants/entitysDB/entitysDB";

const UserSchema = new Schema(
    {
        userid: {type: String, require:true, default: () => new mongoose.Types.ObjectId().toHexString(),},
        username: {type: String, require:true},
        surname: {type: String, require:true},
        password: {type: String, require:true},
    }
);
  
export const UserModel = model<User & Document>(
  EntityDB.USER,
  UserSchema
);