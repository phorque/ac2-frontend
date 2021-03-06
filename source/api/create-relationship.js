import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (attributes) =>
    create('/relationships', {
        data: {
            type: 'Relationship',
            id: generateUUID(),
            attributes
        }
    });
