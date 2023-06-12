import mongoose from "mongoose"


const ContactSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

export default mongoose.model('Contact', ContactSchema);