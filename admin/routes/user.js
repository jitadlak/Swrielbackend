import express from 'express';

const router = express.Router();

import { signin, signup } from '../controllers/user.js';
import { addservice, addcategory, allservices, caterogybyservices, addsubcategories, deleteservice, allservicecategory, deleteservicecategory, allservicesubcategory, deleteservicesubcategory, subcategorybycategory } from '../controllers/service.js';
import auth from "../middleware/auth.js";
import { addpromos, allpromos, assignPromo, deletepromotion, promocodeVerify } from '../controllers/promo.js';
import { addproduct, addproductcategory, addproductList, allproductcategory, allproducts, allproductsList, caterogybyproduct, deleteproduct, productListbycategory, productListVendor } from '../controllers/product.js';
import { addserviceorder, allserviceorder, assignserviceprovider, getServiceOrderById, setserviceorderstatus } from '../controllers/serviceorder.js';
import { addcompany } from '../controllers/company.js';
import { notificationbyUser } from '../controllers/notification.js';
import { addproductorder, allproductorder, assignvendorprovider, getProductOrderByAssignedId, getProductOrderById, setproductorderstatus } from '../controllers/productorder.js';
import { addserviceproviderequest } from '../../users/controllers/serviceProvider.js';
import { addfeedback } from '../controllers/feedback.js';


//authentication
router.post("/signup", signup);
router.post("/signin", signin);

//services
router.post("/addservice", addservice)
router.post("/addcategory", addcategory)
router.get("/allservices", allservices)
router.get("/allservicecategory", allservicecategory)
router.get("/allservicesubcategory", allservicesubcategory)
router.get("/category/:id", caterogybyservices)
router.get("/subcategory/:id", subcategorybycategory)
router.post("/category/addsubcategory", addsubcategories)
router.delete("/deleteservice/:id", deleteservice)
router.delete("/deleteservicecategory/:id", deleteservicecategory)
router.delete("/deleteservicesubcategory/:id", deleteservicesubcategory)

//promos
router.post("/addpromos", addpromos)
router.put("/assignPromo/:id", assignPromo)
router.post("/verifypromocode", promocodeVerify)
router.get("/allpromos", allpromos)
router.delete("/deletepromotion/:id", deletepromotion)


//products
router.post("/addproduct", addproduct)
router.get("/allproducts", allproducts)
router.get("/allproductslists", allproductsList)
router.delete("/deleteproduct/:id", deleteproduct)
router.post("/addproductcategory", addproductcategory)
router.get("/allproductcategory", allproductcategory)
router.post("/addcompany", addcompany)
router.post("/addProductList", addproductList)
router.get("/productcategory/:id", caterogybyproduct)
router.get("/productList/:id", productListbycategory)
router.get("/vendorproductlist/:id", productListVendor)
router.post("/productbook", addproductorder)
router.get("/allproductbooked", allproductorder)
router.patch("/productAssign", assignvendorprovider)
router.patch("/productstatus", setproductorderstatus)
router.get("/userproductorder/:id", getProductOrderById)
router.get("/vendorassignedorder/:id", getProductOrderByAssignedId)
//servicebook
router.post("/servicebook", addserviceorder)
router.patch("/serviceAssign", assignserviceprovider)
router.patch("/serviceStatus", setserviceorderstatus)
router.get("/allservicebooked", allserviceorder)
router.get("/userserviceorder/:id", getServiceOrderById)


//Notification byId
router.get("/notification/:id", notificationbyUser)


//feedback
router.post("/feedback", addfeedback)

export default router;