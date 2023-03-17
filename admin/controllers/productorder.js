import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import notification from "../models/notification.js";
import productOrder from "../models/productOrder.js";

export const addproductorder = async (req, res) => {
    const {
        user,
        order,
        TotalAmount,
        DeliveryFee,
        TotalQuantity,
        addressLine1,
        addressLine2,
        city,
        state,
        zipcode,
        paymentId,
        deliveryStatus,
        deliveryNote,
        serviceProviderId,
        assignTo,
        phone,
        latitude,
        promocodeApplied,
        longitude,
    } = req.body;

    if (!user) {
        return res.status(200).json({
            status: 400,
            message: "User Id Is Required",
        });
    }
    if (!order) {
        return res.status(200).json({
            status: 400,
            message: "order Is Required",
        });
    }
    if (!TotalAmount) {
        return res.status(200).json({
            status: 400,
            message: "Total Amount  Is Required",
        });
    }
    if (!DeliveryFee) {
        return res.status(200).json({
            status: 400,
            message: "Delivery Fee  Is Required",
        });
    }
    // if (!phone) {
    //     return res.status(200).json({
    //         status: 400,
    //         message: "Phone  Is Required",
    //     });
    // }

    if (!paymentId) {
        return res.status(200).json({
            status: 400,
            message: "payment  Is Required",
        });
    }

    try {
        const result = await productOrder.create({
            user,
            order,
            TotalAmount,
            DeliveryFee,
            TotalQuantity,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            paymentId,
            promocodeApplied,
            deliveryStatus,
            deliveryNote,
            serviceProviderId,
            assignTo,
            phone,
            latitude,
            longitude,
            userId: user._id,
        });
        await notification.create({
            notificationTitle: "Your Order Placed Successfully !!",
            notificationDescription: `Your product order Has Been Booked of amount ${TotalAmount}, We will Processing Your Order. `,
            toId: user._id,
        });
        return res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};
export const allproductorder = async (req, res) => {
    try {
        const allorders = await productOrder.find({});
        //console.log(allproduct);
        if (!allorders) {
            return res.status(200).json({
                status: 400,
                message: "Orders Doesn't Exists !!",
            });
        }
        console.log(allorders, "allorders");

        // allorders.map(async (item, index) => {
        //     const userDetail = await UserModal.findById(item.userId);
        //     res.status(200).json({
        //         result: {

        //         }, status: 200
        //     });
        // })
        // const userDetail = await UserModal.findById(allorders.);
        res.status(200).json({ result: allorders, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};
export const assignvendorprovider = async (req, res) => {
    const { _id, assignTo } = req.body;
    console.log(assignTo);
    if (!_id) {
        return res.status(200).json({
            status: 401,
            message: "ID Required",
        });
    }
    if (!assignTo) {
        return res.status(200).json({
            status: 400,
            message: "Vendor Is Required",
        });
    }
    try {

        const oldOrder = await productOrder.findById(_id);

        console.log(oldOrder);

        oldOrder.assignTo = assignTo;

        await oldOrder.save();
        await notification.create({
            notificationTitle: "Congrates !! New Product Order Assigned To You ",
            notificationDescription: ` Product Order Assigned To You Address - ${oldOrder.addressLine1} ${oldOrder.city} , Please Check !! `,
            toId: assignTo,
        });
        // console.log(oldOrder)
        res.status(200).json({
            result: {
                message: "Assigned Successfully !!",
            },
            oldOrder,
            status: 200,
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const setproductorderstatus = async (req, res) => {
    const { _id, deliveryStatus } = req.body;
    console.log(deliveryStatus);
    if (!_id) {
        return res.status(200).json({
            status: 400,
            message: " Order Required",
        });
    }
    if (!deliveryStatus) {
        return res.status(200).json({
            status: 400,
            message: "Delivery Status Is Required",
        });
    }
    try {
        // serviceOrder.findByIdAndUpdate(_id, { $set: serviceProviderId }, { new: true }, function (err, result) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log("RESULT: " + result);
        //     res.send('Done')

        // });
        // console.log(data);

        // res.status(200).json({ result: user, status: 200 });
        const oldOrder = await productOrder.findById(_id);

        console.log(oldOrder);

        oldOrder.deliveryStatus = deliveryStatus;

        await oldOrder.save();
        // console.log(oldOrder)
        res.status(200).json({
            result: {
                message: "Status Changed Successfully",
            },
            oldOrder,
            status: 200,
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const getProductOrderById = async (req, res) => {
    try {
        const data = await productOrder.find({ userId: req.params.id });
        if (!data) {
            return res
                .status(200)
                .json({ message: "No Product Orders !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
export const getProductOrderByAssignedId = async (req, res) => {
    try {
        const data = await productOrder.find({ assignTo: req.params.id });
        console.log(data, 'klkl')
        if (data.length <= 0) {
            return res
                .status(200)
                .json({ result: [], message: "No Product Orders !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
