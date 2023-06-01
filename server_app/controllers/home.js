import { join } from "path";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const home = (req, res) => {
    return res.sendFile(join(`${__dirname}/../views/index.html`));
};

export const getHome = home;