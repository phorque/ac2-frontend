import { batchActions } from 'redux-batched-actions';
import { typeToActions } from 'utils/types';

const recordsUpdatedAt = {};

function normalizeRecord(record) {
    record.attributes = { ...(record.attributes || {}), id: record.id, type: record.type };

    if (record.attributes.created_at) {
        record.attributes.created_at = new Date(record.attributes.created_at);
    }

    if (record.attributes.updated_at) {
        record.attributes.updated_at = new Date(record.attributes.updated_at);
    }

    if (record.relationships) {
        for (const name of Object.keys(record.relationships)) {
            if (Array.isArray(record.relationships[name].data)) {
                record.attributes[name] = record.relationships[name].data;
            } else if (record.relationships[name].data) {
                record.attributes[`${name}_id`] = record.relationships[name].data.id;
                record.attributes[`${name}_type`] = record.relationships[name].data.type;
            } else {
                record.attributes[`${name}_id`] = null;
            }
        }
    }
    return (record);
}

function addRecord(record, options = { commited: true, error: false }) {
    const normalizedRecord = normalizeRecord(record);
    const data = { ...normalizedRecord.attributes, ...options };

    return (
        typeToActions(normalizedRecord.type, 'ADD').map((type) => {
            return ({ type, data });
        }).concat({ type: 'RESOURCE_ADD', data })
    );
}

export default {
    addResource: (resource, options = { commited: true, error: false }) => {
        let actions = [];

        if (Array.isArray(resource.data)) {
            if (resource.included) {
                for (const record of resource.included) {
                    actions = actions.concat(addRecord(record, options));
                }
            }
            for (const record of resource.data) {
                actions = actions.concat(addRecord(record, options));
            }
        } else if (typeof(resource.data) === 'object') {
            if (resource.included) {
                for (const record of resource.included) {
                    actions = actions.concat(addRecord(record, options));
                }
            }
            actions = actions.concat(addRecord(resource.data, options));
        }

        const newActions = actions.reduce((accumulator, action) => {
            if (!recordsUpdatedAt[action.type]) {
                recordsUpdatedAt[action.type] = {};
            }

            if (recordsUpdatedAt[action.type][action.data.id] >= action.data.updated_at) {
                return (accumulator);
            }
            recordsUpdatedAt[action.type][action.data.id] = action.data.updated_at;
            accumulator.push(action);
            return (accumulator);
        }, []);

        return (batchActions(newActions));
    },

    removeJSONAPIResource: (record) => {
        const data = normalizeRecord(record).attributes;
        return (batchActions(
            typeToActions(data.type, 'REMOVE').map((type) => {
                return ({ type, data });
            }).concat({ type: 'RESOURCE_REMOVE', data })
        ));
    },

    removeResource: (data) => {
        return (batchActions(
            typeToActions(data.type, 'REMOVE').map((type) => {
                return ({ type, data });
            }).concat({ type: 'RESOURCE_REMOVE', data })
        ));
    }
};
