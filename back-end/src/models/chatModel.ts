import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the chat message document
export interface IChatMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  recieverId: mongoose.Types.ObjectId; 
  message: string;                  
  status: number[];      
  createdAt: Date;               
  updatedAt: Date;                    
}

// Create a schema for chat messages
const chatMessageSchema = new Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recieverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    readBy: {
      type: [Number], // Defines 'status' as an array of Numbers
      default: [0]   // Sets the default value of 'status' to be an array with one element: 0
  }  
},
  { timestamps: true, collection: "chatMessages" }
);

// Create the model from the schema
export const ChatMessageModel = mongoose.model<IChatMessage>("ChatMessage", chatMessageSchema);
