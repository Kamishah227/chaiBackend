
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
    Username: {
        type: String,
        requierd: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        requierd: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        requierd: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    refreshToken: {
        type: String
    }

}, {
    timestamps: true
}

)

userSchema.pre("save", async function (next) {
    if (!this.ismodified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)

    next()
})

userSchema.methods.isPAsswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genersteAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            Username: this.Username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genersteRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECERT,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)