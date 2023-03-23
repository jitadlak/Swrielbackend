import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import serviceOrder from "../models/serviceOrder.js";
import UserModal from "../../users/models/user.js";
import subcategories from "../models/subcategories.js";
import notification from "../models/notification.js";
import FCM from "fcm-node/lib/fcm.js";
var serverKey = 'AAAATkrD4Mw:APA91bGTcbqtrEqYGFMSsOD6zQT_yXW2nXHTUL7pTVGdZNNt8lWsiLUeM7NhF3xW__GZxCBroQzYV0WlJThtD_gxv90se3qr0J56u71MdvmJzOr0ddkhUaWeOSm5JSFdMgL2voea9UPt';
var fcm = new FCM(serverKey);
export const addserviceorder = async (req, res) => {
    const {
        userId,
        serviceSubcategoryId,
        serviceDate,
        serviceTime,
        serviceSlot,
        addressLine1,
        addressLine2,
        city,
        state,
        zipcode,
        paymentId,
        serviceStatus,
        serviceNote,
        serviceAmount,
        assignTo,
        latitude,
        longitude
    } = req.body;

    if (!userId) {
        return res.status(200).json({
            status: 400,
            message: "User Id Is Required",
        });
    }
    if (!serviceSubcategoryId) {
        return res.status(200).json({
            status: 400,
            message: "Service Sub Category Id Is Required",
        });
    }
    if (!serviceDate) {
        return res.status(200).json({
            status: 400,
            message: "Service Date  Is Required",
        });
    }
    if (!serviceTime) {
        return res.status(200).json({
            status: 400,
            message: "Service Time  Is Required",
        });
    }
    if (!serviceSlot) {
        return res.status(200).json({
            status: 400,
            message: "Service Slot  Is Required",
        });
    }

    if (!paymentId) {
        return res.status(200).json({
            status: 400,
            message: "payment  Is Required",
        });
    }
    if (!serviceSubcategoryId) {
        return res.status(400).json({
            message: "Service Id  Is Required",
        });
    }
    if (!serviceAmount) {
        return res.status(400).json({
            message: "Amount  Is Required",
        });
    }
    try {
        const userDetail = await UserModal.findById(userId);

        const result = await serviceOrder.create({
            userId: userDetail,
            serviceDate,
            serviceSlot,
            serviceStatus,
            serviceTime,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            serviceSubcategoryId,
            paymentId,
            serviceNote,
            serviceAmount,
            assignTo,
            latitude,
            longitude,
            userid: userId
        });
        await notification.create({
            notificationTitle: "Your Service Booking Is Confirmed !!",
            notificationDescription: `Your Service Has Been Booked of amount ${serviceAmount} on ${serviceDate}  and  Slot ${serviceTime} ${serviceSlot} , Please Be Available . `,
            toId: userId,
        })
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: userDetail.device_token,
            collapse_key: 'your_collapse_key',

            notification: {
                title: 'Your Service Booking Is Confirmed !!',
                body: `Your Service Has Been Booked of amount ${serviceAmount} on ${serviceDate}  and  Slot ${serviceTime} ${serviceSlot} , Please Be Available . `
            },

            data: {  //you can send only notification or only data(or include both)
                message: 'my value',
                type: 'my another value'
            }
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
export const allserviceorder = async (req, res) => {
    try {
        const allorders = await serviceOrder.find({});
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
export const assignserviceprovider = async (req, res) => {
    const { _id, serviceProviderId } = req.body;
    console.log(serviceProviderId)
    if (!_id) {
        return res.status(200).json({
            status: 400,
            message: "ID Required",
        });
    }
    if (!serviceProviderId) {
        return res.status(200).json({
            status: 400,
            message: "Service Provider Is Required",
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
        const oldOrder = await serviceOrder.findById(_id);

        console.log(oldOrder)

        oldOrder.serviceProviderId = serviceProviderId

        await oldOrder.save()
        await notification.create({
            notificationTitle: "Congrates !! New Service Order Assigned To You ",
            notificationDescription: ` Service Order Assigned To You Address - ${oldOrder.addressLine1} ${oldOrder.city} , Please Check !! `,
            toId: serviceProviderId,
        })
        // console.log(oldOrder)
        res.status(200).json({
            result: {
                "message": "Assigned Successfully !!"
            }, oldOrder, status: 200
        });




    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const setserviceorderstatus = async (req, res) => {
    const { _id, serviceStatus } = req.body;
    console.log(serviceStatus)
    if (!_id) {
        return res.status(200).json({
            status: 400,
            message: "Service Order Required",
        });
    }
    if (!serviceStatus) {
        return res.status(200).json({
            status: 400,
            message: "Service Status Is Required",
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
        const oldOrder = await serviceOrder.findById(_id);

        console.log(oldOrder)

        oldOrder.serviceStatus = serviceStatus

        await oldOrder.save()
        // console.log(oldOrder)
        res.status(200).json({
            result: {
                "message": "Status Changed Successfully"
            }, oldOrder, status: 200
        });


    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const getServiceOrderById = async (req, res) => {
    try {
        const data = await serviceOrder.find({ userid: req.params.id });
        console.log(data, 'jjjj')
        if (!data) {
            return res.status(200).json({ message: "No Service Order !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }

    } catch (err) {
        res.status(500).json(err);
    }
};