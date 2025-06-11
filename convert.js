const fs = require('fs');
const file = fs.readFileSync("./product-recommendation-auth-firebase-adminsdk-fbsvc-79b835ee97.json", "utf8");
const base64 = Buffer.from(file).toString("base64");
console.log(base64)