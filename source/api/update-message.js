import { update } from 'api/http';

export default (id, attributes) =>
    update(`/messages/${id}`, {
        data: {
            attributes
        }
    });
