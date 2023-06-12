// const inputString = "04018436";
// const regex = /(0|1){1}[0-9]{7}/;


// if (regex.test(inputString)) {
//     console.log("Valid input");
// } else {
//     console.log("Invalid input");<
// }

// const tab = [[ "voiture",[{"nom_voiture": "fiat" }, { "mat": "544536 tb fdgg" }]]];
// console.log(Object.fromEntries(tab));

// let dateExp = new Date();
// const str= "oaca";
// if (str.toLowerCase() === "tunisair" || str.toLowerCase() === "oaca") {
//     dateExp.setFullYear(new Date().getFullYear() + 3);
// }
// else {
//     dateExp.setFullYear(new Date().getFullYear() + 2);
// }

// console.log(dateExp);

// const a = true;
// const b = {
//     [a]: "salem"
// }

// console.log(b);
// import { networkInterfaces } from 'os';

// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//         // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//         if (net.family === familyV4Value && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }
//             results[name].push(net.address);
//         }
//     }
// }
// console.log(results)
import ip from "ip";

// local ip adreess
console.log(ip.address("public","ipv4"));
console.log(ip.address("private","ipv4"));
// import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';

// // public ip adress
// console.log(await publicIpv4());
import {aton,ntoa} from "inet_ipv4";

// console.log(aton(ip.address("private", "ipv4")));
// console.log(ntoa(3232235794));