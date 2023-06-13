import jwt from "jsonwebtoken";

// middlewares
export const verifyToken = (req, res, next) => {
    // the token which cookie is unsigned are accessed via the req.cookies object 
    const token = req.universalCookies.get("access_token");
    if (!token) {
        return res.status(401).json({ message: "vous n’êtes pas authentifié" })
    }

    jwt.verify(token, process.env.JWT, (err, employe) => {
        // we've assigned the token data to user parameter
        if (err) return res.status(402).json({ message: "le token n'est pas valide" })
        req.employe = employe;
        //access the next operation(function) declared in the endpoint 
        next();
    })
}

export const verifyEmploye = (req, res, next) => {
    verifyToken(req, res, () => {
        // the next parameter is not neccesary here because it will launch the operation in checkauthentication endpoint
        if (req.employe.id === req.params.id || req.employe.isAdmin) {
            next()
        } else {
            return res.status(403).json({ message: "Vous n’êtes pas autorisé !" })
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // the next parameter is not neccesary here bacause it will lauch the operation in checkauthentication endpoint
        if (req.employe.isAdmin) {
            next()
        } else {
            return res.status(403).json({ message: "Vous n’êtes pas autorisé !" })
        }
    })
}