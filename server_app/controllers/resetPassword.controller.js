import bcrypt from "bcryptjs";
import crypto from "crypto";
import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";
import { sendVerification } from "../utils/email.js";
import { db } from "../models/index.js";

export const resetPassEmail = async (req, res, next) => {
    // it's recommended to use try/catch block with api requests and DB interactions(like the datasave)
    try {
        // 1/check the email format
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email")
        });
        console.log(req.body.email)
        const { error } = emailSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        // 2/ format is correct => check the existence of the user
        const employe = await db.employe.findOne({ where: { email: req.body.email } });
        if (!employe)
            return res
                .status(409)
                .json({ message: "l'email n'existe pas" });

        let token = await db.token.findOne({ where: { employeId: employe.id } });
        if (!token) {
            token = await db.token.create({
                employeId: employe.id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }
        let url;
        if (employe.isAdmin) {
            url = `${process.env.BASE_URL_C}etablissement/login/password_reset/${employe.id}/${token.token}`;
        }
        else {
            url = `${process.env.BASE_URL_C}employe/login/password_reset/${employe.id}/${token.token}`;
        }

        await sendVerification(employe.email, "Changer mot de passe", `<div><h1>Lien de réintialisation de mot de passe</h1>
            <h2>Bonjour</h2>
            <p>Pour Changer votre mot de passe, click le lien si dessus </p>
            <a href=${url}>Click Here</a>
            </div>`);

        res
            .status(200)
            .json({ message: "un lien de réintialisation est envoyée,veuillez consultez votre boîte mail" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const verifyLink = async (req, res) => {
    try {
        const employe = await db.employe.findByPk(req.params.id);

        if (!employe) {
            return res.status(400).json({ message: "id d'employé incorrect" });
        }

        const token = await db.token.findOne({
            where: {
                employeId: employe.id,
                token: req.params.token,
            }

        });
        if (!token) {
            return res.status(400).json({ message: "token de validation incorrect" });
        }
        res.status(200).json({ message: "lien valide" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const setPassword = async (req, res) => {
    try {
        const passwordSchema = Joi.object({
            password: JoiPasswordComplexity().required().label("Password"),
        });
        const { error } = passwordSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const employe = await db.employe.findByPk(req.params.id);
        if (!employe) return res.status(400).json({ message: "id d'employe invalide" });

        let token = await db.token.findOne({
            where: {
                employeId: employe.id,
                token: req.params.token,
            }
        });
        if (!token) return res.status(400).json({ message: "token de validation invalide" });

        if (!employe.verified) {
            let url;
            if (employe.isAdmin) {
                url = `${process.env.BASE_URL_C}etablissement/addAdmin/verify/${employe.id}/${token.token}`;
            } else {
                url = `${process.env.BASE_URL_C}employe/verify/${employe.id}/${token.token}`;
            }
            await sendVerification(
                employe.email,
                "Email de confirmation",
                `<div><h1>Email de confirmation de compte</h1>
                <h2>Bonjour</h2>
                <p>Pour vérifier votre compte Mr/Mdme ${employe.nom} , cliquez le lien si dessus </p>
                <a href=${url}>Click Here</a>
                </div>`
            );
            return res
                .status(400)
                .json({ message: "un email de valdation à été envoyé , validez votre email d'abord et revenez pour modifer le password" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        db.employe.update({ password: hashPassword }, {
            where: { id: employe.id }
        });

        return res.status(200).json({ message: "réinitialisation mot de passe réussie" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};
