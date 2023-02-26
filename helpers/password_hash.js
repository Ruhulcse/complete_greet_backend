const bcrypt = require('bcrypt');
const rounds = 10;

module.exports.hashPassword = async function(password) {
    try {
        let salt = bcrypt.genSaltSync(rounds);
        return bcrypt.hashSync(password, salt);
    } catch (e) {
        console.log(e.message || 'Bcrypt Error!');
        return null;
    }
};

module.exports.comparePassword = function(password, hash) {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (e) {
        console.log(e.message || 'Bcrypt Error!');
        return null;
    }
};