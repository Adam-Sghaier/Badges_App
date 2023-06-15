import { db } from "../models/index.js";
import { loginValidator } from "../utils/validator.js";
import bcrypt from "bcryptjs";
import { aton } from "inet_ipv4";
import ip from "ip";
import jwt from "jsonwebtoken";
import { sendVerification } from "../utils/email.js";
import { randomBytes } from "crypto";

export const login = async (req, res, next) => {
    try {
        const { error } = loginValidator({ email: req.body.email });
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        // the find one method returns one document
        await db.employe.findOne({ where: { email: req.body.email } }).then(async (emp) => {
            if (!emp) {
                return res.status(404).json({ message: "email incorrect" });
            }
            const isPasswordCorrect = await bcrypt.compare(
                req.body.password,
                emp.password
            );
            if (!isPasswordCorrect) { return res.status(404).json({ message: "mot de passe incorrect" }); }

            if (!emp.verified) {
                let token1 = await db.token.findOne({ where: { employeId: emp.id } });

                if (!token1) {
                    const newToken = await db.token.create({
                        employeId: emp.id,
                        token: randomBytes(32).toString("hex"),
                    });

                    if (emp.isAdmin) {
                        url = `${process.env.BASE_URL_C}etablissement/addAdmin/verify/${emp.id}/${newToken.token}`;
                        await sendVerification(
                            data.email,
                            "Email de confirmation",
                            `<div><h1>Email de confirmation de compte</h1>
                                <h2>Bonjour</h2>
                                <p>Pour vérifier votre compte Mr/Mdme ${req.body.nom} , cliquez le lien si dessus </p>
                                <a href=${url}>Click Here</a>
                                </div>`
                        );
                    } else {
                        url = `${process.env.BASE_URL_C}employe/verify/${data.id}/${newToken.token}`;
                        await sendVerification(
                            data.email,
                            "Email de confirmation",
                            `<div><h1>Email de confirmation de compte</h1>
                            <h2>Bonjour</h2>
                            <p>Pour vérifier votre compte Mr/Mdme ${req.body.nom} , cliquez le lien si dessus </p>
                            <a href=${url}>Click Here</a><br>
                            <b>Lors du création de votre demande du badge ,veuillez choisir cette zone : Toute Zone </b>
                            </div>`
                        );
                    }
                }
                if (emp.isAdmin) {
                    await db.ip.findOne({ where: { ip_address: aton(ip.address("public", "ipv4")), employeId: emp.id } }).then(async (id) => {
                        if (!id) {
                            await db.ip.create({ ip_address: aton(ip.address("public", "ipv4")), employeId: data.id });
                        }
                        return res.status(400).json({ id: data.id, message: "une message de validation à été envoyé , veuillez vérifier votre boîte mail" });
                    })
                }

            }
            // we gonna sign(hash) this data in jwt string format and for each api request we gonna use this jwt to verify our identity
            const token = jwt.sign(
                { id: emp.id, isAdmin: emp.isAdmin },
                randomBytes(32).toString("hex")
            );
            // we're excluding password & isAdmin properties because they are sensitive data that shouldn't be returned to frontend using the user._doc(this statement is affecting the user._doc value to the ...otherProperties object)
            const { nom, prenom, email, isAdmin, etablissementId, ...otherProperties } = emp;
            req.universalCookies.set("access_token", token, {
                // dissallow any secret client to reach this cookie => much secure
                httpOnly: false,
            })
            // send a cookie alongside the res object using the cookie method(cookie_name,jwt instance,config object)
            return res
                .status(200)
                .json({ details: { nom, prenom, email, etablissementId }, isAdmin });
        })


    } catch (error) {
        return res.status(500).send({
            message:
                error.message || "Some error occurred while Login."
        });
    }
};