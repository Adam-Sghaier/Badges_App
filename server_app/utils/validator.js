import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";
//create validator schema 

export const createEmployeValidator = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(3).max(30).label("nom").required(),
        prenom: Joi.string().min(3).max(30).label("prenom").required(),
        email: Joi.string().email().label("email").required(),
        fonction: Joi.string().min(3).max(30).label("fonction").required()
    });
    return schema.validate(data);

}

export const updateEmployeValidator = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(3).max(30).label("nom"),
        prenom: Joi.string().min(3).max(30).label("prenom"),
        email: Joi.string().email().label("email"),
        fonction: Joi.string().min(3).max(30).label("fonction"),
        voiture_nom: Joi.string.min(3).max(30).label("nom voiture"),
        voiture_matricule: Joi.string().pattern(new RegExp(/^[0-9]{2,3}[\s]{1}تونس[\s]{0,1}[0-9]{4}$/)).message('l\'immatriculation doit respecter la forme suivante (XX تونس XXXX) OU (XXX تونس XXXX)'),
        password: JoiPasswordComplexity().label("password"),
        naissance_date: Joi.date().format('DD-MM-YYYY').max('01-01-2004').messages({ 'date.max': `Age must be 18+` }),
        naissance_lieu: Joi.string().min(3).max(30).label("lieu de naissance"),
        famille_pere: Joi.string().min(3).min(20).label('nom du pére'),
        famille_grandPere: Joi.string().min(3).min(20).label('nom du grand pére'),
        famille_mere: Joi.string().min(3).min(20).label('nom du mére'),
        famille_pereMere: Joi.string().min(3).min(20).label('nom du pére de ton mére'),
        famille_conjoint: Joi.string().min(3).min(20).label('nom du conjoint'),
        famille_pereConjoint: Joi.string().min(3).min(20).label('nom du pére du conjoint'),
        adresse: Joi.string().pattern(new RegExp(/(\d*)+\s(?:[a-zA-Z0-9]+\s?)+/)).label("adresse"),
        identification_numCin: Joi.string().pattern(new RegExp(/(0|1){1}[0-9]{7}/)).label('le numéro de la carte d\'identité nationale'),
        identification_dateCin: Joi.date().format('DD-MM-YYYY').messages({ 'date.format': `Date format is DD-MM-YYYY` }),
        identification_numPasseport: Joi.string().min(7).label("numéro du passeport"),
        identification_datePasseport: Joi.date().format('DD-MM-YYYY').messages({ 'date.format': `Date format is DD-MM-YYYY` })
    });
    return schema.validate(data);

}

export const createDemandeValidator = (data) => {
    const schema = Joi.object({
        employeId: Joi.string().label("les infos de l'employe").required(),
        type: Joi.string().valid(["Personnel", "Vehicule"]).required(),
        demande: Joi.string().valid(["Toute Zone,Sous Douane,Parking Avion"]).label("Zone demandée").required(),
        dateExp: Joi.date().format('DD-MM-YYYY').label("date expiration").required(),
        idDirecteur: Joi.string().label("Info Directeur").required(),
        sommaireTache: Joi.string().min(20).label("Description Sommaire de tache").required()
    });
    return schema.validate(data);

}

export const createAgentValidator = (data) => {
    const schema = Joi.object({
        nom: Joi.string().label("nom").required(),
        prenom: Joi.string().label("prenom").required(),
        direction: Joi.string().valid(["Police , RJ , DGPFE , Douane"]).label("Direction").required(),
        fonction: Joi.string().label("fonction").required(),
        email: Joi.string().email().label("email").required(),
        password: JoiPasswordComplexity().label("password").required(),
    });
    return schema.validate(data);

}

export const UpdateAgentValidator = (data) => {
    const schema = Joi.object({
        nom: Joi.string().label("nom"),
        prenom: Joi.string().label("prenom"),
        direction: Joi.string().valid(["Police , RJ , DGPFE , Douane"]).label("Direction"),
        fonction: Joi.string().label("fonction"),
        email: Joi.string().email().label("email"),
        password: JoiPasswordComplexity().label("password"),
    });
    return schema.validate(data);

}

