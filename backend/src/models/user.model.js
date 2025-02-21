import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },

    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    }

},{minimize:false, timestamps:true});




userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
};
  

//Access token refreh token
// userSchema.methods.generateAccessToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             fullName: this.fullName,
//             role: this.role
//         },

//         process.env.ACCESS_TOKEN_SCERET,

//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }


// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
//         },

//         process.env.REFRESH_TOKEN_SECRET,

//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }


export const User = mongoose.model("User",userSchema)