import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import notification from "../models/notification.js";
import productOrder from "../models/productOrder.js";
import FCM from "fcm-node/lib/fcm.js";
import vendor from "../../users/models/vendor.js";
var serverKey =
    "AAAATkrD4Mw:APA91bGTcbqtrEqYGFMSsOD6zQT_yXW2nXHTUL7pTVGdZNNt8lWsiLUeM7NhF3xW__GZxCBroQzYV0WlJThtD_gxv90se3qr0J56u71MdvmJzOr0ddkhUaWeOSm5JSFdMgL2voea9UPt";
var fcm = new FCM(serverKey);

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
        var message = {
            //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: user.device_token,
            collapse_key: "your_collapse_key",

            notification: {
                title: "Your Order Placed Successfully !!",
                body: `Your product order Has Been Booked of amount ${TotalAmount}, We will Processing Your Order. `,
            },

            data: {
                //you can send only notification or only data(or include both)
                message: "my value",
                type: "my another value",
            },
        };

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
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
        const venderData = await vendor.findById(assignTo);
        if (venderData) {
            var message = {
                //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: venderData.device_token,
                collapse_key: "your_collapse_key",

                notification: {
                    title: "Congrates !! New Product Order Assigned To You ",
                    body: `Product Order Assigned To You  !!`,
                },

                data: {
                    //you can send only notification or only data(or include both)
                    message: "my value",
                    type: "my another value",
                },
            };

            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });
        }
        if (oldOrder?.user?.device_token) {
            console.log('aaya')
            var message = {
                //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: oldOrder?.user?.device_token,
                collapse_key: "your_collapse_key",

                notification: {
                    title: "Order Update ",
                    body: `Your Product Assigned To Our Vendor !!`,
                },

                data: {
                    //you can send only notification or only data(or include both)
                    message: "my value",
                    type: "my another value",
                },
            };

            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });
        }

        res.status(200).json({
            result: {
                message: "Assigned Successfully !!",
            },
            oldOrder,
            status: 200,
        });
        await notification.create({
            notificationTitle: "Congrates !! New Product Order Assigned To You ",
            notificationDescription: ` Product Order Assigned To You `,
            toId: assignTo,
        });

        // console.log(oldOrder)
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
        if (oldOrder?.user?.device_token) {
            var message = {
                //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: venderData.device_token,
                collapse_key: "your_collapse_key",

                notification: {
                    title: "Order Update ",
                    body: `Your Product Status - ${deliveryStatus}!!`,
                },

                data: {
                    //you can send only notification or only data(or include both)
                    message: "my value",
                    type: "my another value",
                },
            };

            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });
        }
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
        if (data.length <= 0) {
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
        console.log(data, "klkl");
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
