export const isAuth = (req, res, next) => {
    try {
        // get jwt from header 
        // check if validation and in debugger

        const authorized = false
        authorized ? next() :
            res.status(403).json({
                status: "error",
                message: "authorized"
            })
    } catch (error) {
        next(error)

    }
}