import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "swriel";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(200).json({
            status: 401,
            message: "Email Required",
        });
    }
    if (!password) {
        return res.status(200).json({
            status: 401,
            message: "password Required",
        });
    }
    try {
        const oldUser = await UserModal.findOne({
            email,
        });
        if (!oldUser) {
            return res.status(200).json({ message: "User Doesn't Exists !!", status: 401, });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({
                message: "Invalid Credentiails",
                status: 401,
            });
        }
        const token = jwt.sign(
            { username: oldUser.username, id: oldUser._id },
            secret,
            { expiresIn: "2h" }
        );
        res.status(200).json({ result: oldUser, token, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const signup = async (req, res) => {
    const { email, password, phone, name, image, address, city, state } = req.body;


    if (!email) {
        return res.status(200).json({
            status: 401,
            message: "Email Is Required",
        });
    }
    if (!password) {
        return res.status(200).json({
            status: 401,
            message: "Password Is Required",
        });
    }

    if (!phone) {
        return res.status(200).json({
            status: 401,
            message: "phone Is Required",
        });
    }
    if (!name) {
        return res.status(200).json({
            status: 401,
            message: "name Is Required",
        });
    }
    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) {
            return res.status(200).json({
                status: 401,
                message: "User Already Exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({
            email,
            password: hashedPassword,
            phone,
            name,
            address,
            image,
            city,
            state

        });

        const token = jwt.sign({ email: result.email, _id: result._id }, secret, {

        });
        res.status(200).json({ result, token, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
}

export const getalluser = async (req, res) => {
    try {
        const alluser = await UserModal.find({});
        //console.log(allservices);
        if (!alluser) {
            return res.status(200).json({
                status: 400,
                message: "Users Doesn't Exists !!"
            });
        }
        res.status(200).json({
            status: 200,
            result: alluser
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }

}