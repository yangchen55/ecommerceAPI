import express from 'express'
import clientPromise from '../config/dbConfig.js'

const router = express.Router()

let db
let client
let customerList



async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db()
        customerList = await db.collection('client_users')
        db && console.log('Mongo db connected!')
    } catch (error) {
        throw new Error('Failed to connect to db')
    }
}



router.get('/', async (req, res, next) => {
    await init()
    try {
        const customerLists = await customerList.find().toArray()
        const customers = customerLists.map((customer) => {
            const { password, isEmailVerified, emailVerificationCode, refreshJWT, createdAt,
                updatedAt, __v, ...rest } = customer
            return rest
        })

        res.json({
            status: "success",
            message: "customer list ",
            customers

        });

    } catch (error) {
        next(error)
    }
})






export default router