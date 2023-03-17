import jwt from 'jsonwebtoken';

import admin from '../models/admin.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)
        const user = await admin.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user, 'hj')
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ success: false, error: 'Please Authenticate...' })
    }
}
export default auth