import mongoose from 'mongoose';

const AttendSchema = new mongoose.Schema(
  {
   
    EmployeId: {
      type: String,
      required: true,
      
    },
    time: {
        type: String,
        required: true,
     
      },
      price: {
        type: Number,
        required: true,
     
      },
   
   
   
  },
  { timestamps: true }
);

const Attend = mongoose.model('Attend', AttendSchema);

export default Attend;