import jwt from "jsonwebtoken";
import user from '../models/user.js'
import vendor from "../models/vendor.js";
// const secret = "swriel";
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded, 'hjjkhjk')
        // const user = await vendor.findOne({ _id: decoded._id })
        // console.log(user)
        if (!decoded._id) {
            throw new Error()
        }

        req.token = token

        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ success: false, error: 'Please Authenticate...' })
    }
}
export default auth