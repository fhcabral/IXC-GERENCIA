import mongoose, { Document, Schema, model } from "mongoose";
import { Transaction } from "../../../../../../domain/transaction/entity/transaction.entity";
import { EntityDB } from "../../../../../shared/constants/entitysDB/entitysDB";

const TransactionSchema = new Schema(
    {
      transactionID: { type: String, required: true,default: () => new mongoose.Types.ObjectId().toHexString(), // Gerador automático
    },
      userID: { type: String, required: true },
      description: { type: String, required: true },
      value: { type: Number, required: true },
      Date: { type: String, default: null },
      recipeOrExit: { type: String, require: true, default: null }
    },
    { timestamps: true }
  );
  
  export const TransactionModel = model<Transaction & Document>(
    EntityDB.TRANSACTION,
    TransactionSchema
  );