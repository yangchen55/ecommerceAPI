import jwt from "jsonwebtoken"

import { updateAdmin } from "../models/admin/AdminModel.js";
import { createNewSession } from "../models/session/SessionModel.js"

export const signAccessJWT = async (payload) => {
    // Sign the payload with the secret key and set an expiration time of 30 minutes
    const access_jwt = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: "15m" })

    await createNewSession({
        associate: payload.email,
        token: access_jwt
    })


    // Return the signed access JWT
    return access_jwt
};
export const verifyAccessJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS);
        return decoded

    } catch (error) {
        return error.message.includes("jwt expired") ?
            "jwt expired"
            : error.message;
    }
}


export const signRefreshJWT = async (payload) => {
    const refresh_jwt = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: "30d" });
    await updateAdmin({ email: payload.email }, { refresh_jwt })

    return refresh_jwt


}
