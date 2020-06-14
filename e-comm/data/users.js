const Repository = require('./repository');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

class Users extends Repository {
    async create(attrs) {
        const records = await this.getAll();
        attrs.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex');

        const buf = await scrypt(attrs.pwd, salt, 64);
        const record = {
            ...attrs,
            pwd: `${buf.toString('hex')}+${salt}`
        };
        records.push(record);
        await this.writeAll(records);
        return record;
    }

    async comparePassword(saved, supplied) {
        const [hashed, salt] = saved.split('+');

        const buf = await scrypt(supplied, salt, 64);

        return hashed === buf.toString('hex');
    }


}
module.exports = new Users('users.json');