import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import vendor from "../models/vendor.js";
import vendorproducts from "../models/vendorproducts.js";
import vendorwithdrawrequest from "../models/vendorwithdrawrequest.js";
import productList from "../../admin/models/productList.js";
import notification from "../../admin/models/notification.js";
const secret = "swriel";

export const vendorsignin = async (req, res) => {
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
        const oldUser = await vendor.findOne({
            email,
        });
        if (!oldUser) {
            return res
                .status(200)
                .json({ message: "Vendor Doesn't Exists !!", status: 401 });
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

export const vendorsignup = async (req, res) => {
    const {
        email,
        name,
        storename,
        storecontactno,
        password,
        phone,
        image,
        storeaddress,
        websitelink,
        membership,

    } = req.body;
    console.log(req.body);

    if (!email) {
        return res.status(200).json({
            status: 401,
            message: "Email Is Required",
        });
    }
    if (!name) {
        return res.status(200).json({
            status: 401,
            message: "Full Name Is Required",
        });
    }

    if (!storename) {
        return res.status(200).json({
            status: 401,
            message: "Store Name Is Required",
        });
    }
    if (!password) {
        return res.status(200).json({
            status: 401,
            message: "Password Is Required",
        });
    }
    if (!storecontactno) {
        return res.status(200).json({
            status: 401,
            message: "Store Contact No Is Required",
        });
    }
    if (!phone) {
        return res.status(200).json({
            status: 401,
            message: "Phone Is Required",
        });
    }
    // if (image) {
    //     return res.status(200).json({
    //         status: 401,
    //         message: "Profile Image Is Required",
    //     });
    // }
    if (!storeaddress) {
        return res.status(200).json({
            status: 401,
            message: "Store Address Is Required",
        });
    }
    if (!membership) {
        return res.status(200).json({
            status: 401,
            message: "Membership Is Required",
        });
    }
    try {
        const oldUser = await vendor.findOne({ email });

        if (oldUser) {
            return res.status(200).json({
                status: 401,
                message: "Vendor Already Exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await vendor.create({
            email,
            name,
            storename,
            storecontactno,
            password: hashedPassword,
            phone,
            image,
            storeaddress,
            websitelink,
            membership,
        });

        const token = jwt.sign(
            { email: result.email, _id: result._id },
            process.env.SECRET_KEY,
            {}
        );

        const result1 = await vendorproducts.create({
            vendorId: result._id,
            products: []
        })
        res.status(200).json({ result, token, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const getallvendor = async (req, res) => {
    try {
        const alluser = await vendor.find({});
        //console.log(allservices);
        if (!alluser) {
            return res.status(200).json({
                status: 400,
                message: "Vendor Doesn't Exists !!"
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



export const addvendorrequest = async (req, res) => {
    const {
        amount,
        vendor,
        approved,

    } = req.body;
    console.log(req.body);

    if (!amount) {
        return res.status(200).json({
            status: 401,
            message: "Amount Is Required",
        });
    }
    if (!vendor) {
        return res.status(200).json({
            status: 401,
            message: "Vendor Is Required",
        });
    }

    try {

        const result = await vendorwithdrawrequest.create({
            amount,
            vendor,
            approved,
        });


        res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const getallvendorrequest = async (req, res) => {
    try {
        const alluser = await vendorwithdrawrequest.find({});
        //console.log(allservices);
        if (!alluser) {
            return res.status(200).json({
                status: 400,
                message: "Service Provider Doesn't Exists !!",
            });
        }
        res.status(200).json({
            status: 200,
            result: alluser,
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};


export const getvendorproductList = async (req, res) => {
    try {
        const alluser = await vendorproducts.findOne({ vendorId: req.params.id });
        console.log(alluser, 'hjhjkjhjkh');
        if (!alluser) {
            return res.status(200).json({
                status: 400,
                message: "vendor Products Doesn't Exists !!"
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
export const selectVendorProduct = async (req, res) => {
    const { vendorId, product } = req.body;

    if (!vendorId) {
        return res.status(200).json({
            status: 401,
            message: "ID Required",
        });
    }
    if (!product) {
        return res.status(200).json({
            status: 400,
            message: "Product Is Required",
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
        const oldOrder = await vendorproducts.findOne({ vendorId: vendorId });

        console.log(product)
        const data = [...oldOrder.products, product]

        oldOrder.products = data

        await oldOrder.save()
        // await notification.create({
        //     notificationTitle: "Congrates !! New Service Order Assigned To You ",
        //     notificationDescription: ` Service Order Assigned To You Address - ${oldOrder.addressLine1} ${oldOrder.city} , Please Check !! `,
        //     toId: serviceProviderId,
        // })
        // console.log(oldOrder)
        res.status(200).json({
            result: {
                "message": "Selected Successfully !!"
            }, status: 200
        });




    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
}; export const updatevendorbalance = async (req, res) => {
    const { _id, walletBalance, comment } = req.body;

    if (!_id) {
        return res.status(200).json({
            status: 400,
            message: "Vendor Required",
        });
    }
    if (!walletBalance) {
        return res.status(200).json({
            status: 400,
            message: "Updated Balance Is Required",
        });
    }
    try {
        const oldOrder = await vendor.findById(_id);

        console.log(oldOrder);

        oldOrder.walletBalance = walletBalance;

        await oldOrder.save();
        // console.log(oldOrder)
        await notification.create({
            notificationTitle: "Wallet Balance Updated ",
            notificationDescription: `Your wallet Balance Has Been Updated - ${comment} !!`,
            toId: _id,
        })
        // con
        res.status(200).json({
            result: {
                message: "Wallet Balance Updated Successfully",
            },
            oldOrder,
            status: 200,
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};
