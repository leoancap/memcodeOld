import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"

//Todo: add uniqueness and email validations to email field
var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    decksToReview: { type: [decksToReviewSchema], default: [] },
  },
  { timestamps: true },
)

var decksToReviewSchema = new mongoose.Schema({
  id: { type: String },
  katasToReview: { type: [katasToReviewSchema] },
})
var katasToReviewSchema = new mongoose.Schema({
  id: { type: String },
  nextInterval: { type: Number },
  lastAttempt: { type: Date },
})

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10)
}

userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
  )
}

userSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${
    process.env.HOST
  }/reset_password/${this.generateResetPasswordToken()}`
}

userSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  )
}

userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    token: this.generateJWT(),
  }
}

userSchema.plugin(uniqueValidator, { message: "this email is already taken" })

export const KatasToReview = mongoose.model(
  "KatasToReview",
  katasToReviewSchema,
)
export const DecksToReview = mongoose.model(
  "DecksToReview",
  decksToReviewSchema,
)
export default mongoose.model("User", userSchema)
