import express from 'express';
import { addbankaccount } from '../controllers/bankaccounts.js';
import { addserviceproviderequest, getallserviceprovider, getallserviceproviderrequest, getassignedserviceorder, providersignin, providersignup, providerVerify, updateproviderbalance } from '../controllers/serviceProvider.js';

const router = express.Router();

import { getalluser, signin, signup } from '../controllers/user.js';
import { addvendorrequest, getallvendor, getallvendorrequest, getvendorproductList, selectVendorProduct, updatevendorbalance, vendorsignin, vendorsignup } from '../controllers/vendor.js';
import auth from "../middleware/auth.js";


//user
router.post("/signup", signup);
router.post("/signin", signin);
router.get('/users', getalluser)


//vendor
router.post("/vendor/signup", vendorsignup);
router.post("/vendor/signin", vendorsignin);
router.get("/vendor/all", getallvendor);
router.post("/vendor/withdraw", addvendorrequest)
router.get("/vendor/allrequests", getallvendorrequest)
router.get("/vendor/allproducts/:id", getvendorproductList)
router.post("/vendor/selectproduct", selectVendorProduct);
router.patch("/updatewalletvendor", updatevendorbalance)
router.get("/vendor/allrequests", getallvendorrequest)

//serviceProvider
router.post("/provider/signup", providersignup);
router.post("/provider/signin", providersignin);
router.post("/verifyprovider", providerVerify);
router.get("/provider/all", getallserviceprovider);
router.get("/assignservices/:id", getassignedserviceorder)
router.patch("/updatewallet", updateproviderbalance)
router.post("/provider/withdraw", addserviceproviderequest)
router.get("/provider/allrequests", getallserviceproviderrequest)


router.post("/bankadd", addbankaccount);

export default router;