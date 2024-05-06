import mongoose from 'mongoose';

const AbsentSchema = new mongoose.Schema(
  {

    currentuserId: {
      type: String,
      required: true,
      
    },
   
    Email: {
      type: String,
      required: true,
      
    },
    Phone: {
        type: Number,
        required: true,
     
      },
      desc: {
        type: String,
        required: true,
     
      },
      status: {
        type: String,
        enum: ['Processing', 'Approval '], 
        default: 'Processing' 
      }
   
   
   
  },
  { timestamps: true }
);

const Absent = mongoose.model('Absent', AbsentSchema);

export default Absent;