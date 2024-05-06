import mongoose from 'mongoose';

const EmpSchema = new mongoose.Schema(
  {
   
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    BirthDate: {
      type: String,
      required: true,
    },


    Gender: {
      type: String,
      required: true,
    },
    Contact: {
      type: String,
      required: true,
    },

    Address: {
      type: String,
      required: true,
    },
    
    Position: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
   
  },
  { timestamps: true }
);

const Emp = mongoose.model('Emp', EmpSchema);

export default Emp;