import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import notification from "../models/notification.js";

export const notificationbyUser = async (req, res) => {
    try {
        const data = await notification.find({ toId: req.params.id });
        if (!data) {
            return res.status(200).json({ message: "Notification Doesn't Exists !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }
        return res.status(200).json({ message: "Notification Doesn't Exists !!", status: 400 });
    } catch (err) {
        res.status(500).json(err);
    }
};
