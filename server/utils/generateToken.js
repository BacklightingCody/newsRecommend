const crypto = require('crypto');

module.exports ={
    async generateResetToken(){
        return crypto.randomBytes(20).toString('hex');
    }
}