const crypto = require('crypto');
module.exports = {
    encrypt:(text) => {
        const algorithm = 'aes-256-ctr';
        const secretKey = process.env.SECRET_KEY;
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text),cipher.final()]);

        return{
            iv:iv.toString('hex'),
            content:encrypted.toString('hex')
        };
    }
    };
