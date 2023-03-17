import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AdminModal from "../models/admin.js";


const secret = "swriel";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(200).json({
            status: 400,
            message: "Email Required"
        });

    }
    if (!password) {
        return res.status(200).json({
            status: 400,
            message: "password Required"
        });

    }

    try {
        const oldUser = await AdminModal.findOne({
            email,
        });
        if (!oldUser) {
            return res.status(200).json({
                status: 400,
                message: "Admin Doesn't Exists !!"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({
                status: 400,
                message: "Invalid Credentiails",
            });
        }
        const token = jwt.sign(
            { username: oldUser.username, id: oldUser._id },
            secret,
            { expiresIn: "2h" }
        );
        res.status(200).json({
            status: 200,
            result: oldUser, token
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
}


export const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email Is Required",
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "Password Is Required",
        });
    }
    try {
        const oldUser = await AdminModal.findOne({ email });

        if (oldUser) {
            return res.status(400).json({
                message: "User Already Exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await AdminModal.create({
            email,
            password: hashedPassword,

        });

        const token = jwt.sign({ email: result.email, _id: result._id }, secret, {
            expiresIn: "1h",
        });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};