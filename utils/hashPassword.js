const bcrypt = require("bcrypt")

const hashPassword = async(plaintextPassword) =>{
   const hash = await bcrypt.hash(plaintextPassword,10);
   return hash;
}
const comparePassword = async() =>{
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
module.exports = {
    hashPassword,
    comparePassword,
};