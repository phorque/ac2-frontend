import { create } from 'api/http';

export default (record) =>
    create('/oauth/token', {
        username: record.email,
        password: record.password,
        grant_type: 'password'
    });
