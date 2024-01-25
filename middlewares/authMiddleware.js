const JWT = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'un-Authorized User'
                })
            }
            else {
                req.body.id = decode.id;
                next()
            }
        });
    }
    catch (error) {
        console.log("Error en el middleware de autenticacion: ", error);
        res.status(500).send({
            success: false,
            message: "please provide auth token",
            error
        })
    }

}