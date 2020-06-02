const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

class Users {
    constructor(filename) {
        if (!filename)
            throw new Error('Creating repository need a file name required');

        this.filename = filename;

        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }

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

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if (!record) throw new Error(`Unable to find record id : ${id}`)

        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;
            for (let key in filters) {
                if (record[key] !== filters[key])
                    found = false;
            }
            if (found)
                return record;
        }
    }

    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    randomId() {
        return crypto.randomBytes(5).toString('hex');
    }

    async comparePassword(saved, supplied) {
        const [hashed, salt] = saved.split('+');

        const buf = await scrypt(supplied, salt, 64);

        return hashed === buf.toString('hex');
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

}
module.exports = new Users('users.json');
// const test = async () => {
//     const repo = new Users('users.json');
//     // await repo.create({
//     //     email: 'test@tes.com',
//     //     pwd: 'acds'
//     // })
//     //console.log(await repo.getAll());
//     // console.log(await repo.update('867',{email:'niti'}))

//     // console.log(await repo.getOneBy({
//     //     email: 'niti'
//     // }))

//     console.log(await repo.getOneBy({
//         pwd: 'acds',
//         email: 'niti'
//     }));
// }
// test();