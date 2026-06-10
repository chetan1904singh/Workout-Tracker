import mongoose from 'mongoose'
import bcrypt from 'bcrypt'




const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


//signup function**
userSchema.statics.signup=async function (email,password){
  const exists= await this.findOne({email});
  if(exists){
        throw Error('Email already in use');
  }
  
  //hashing and salting using bcrypt
  const salt=await bcrypt.genSalt(10);
  const hash=await bcrypt.hash(password,salt);
  
  //create user in db
  const user=await this.create({email:email,password:hash});

  return user;

}

const User = mongoose.model('User', userSchema);

export default User;


