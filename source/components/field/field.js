import React, { PropTypes } from 'react';

import PureRenderMixin from 'components/pure-render-mixin';

import StringField from './string';
import TextField from './text';
import EnumField from './enum';
import ArrayField from './array';
import EnumArray from './enum-array';
import ObjectField from './object';
import Dictionnary from './dictionnary';
import DateTimeField from './date-time';

const Field = React.createClass({
    propTypes: {
        schema: PropTypes.object.isRequired,
        depth: PropTypes.number
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({ depth: 0 });
    },

    render() {
        const newProps = {
            ...this.props,
            depth: (this.props.depth + 1)
        };

        switch (this.props.schema.type) {
        case 'string':
            if (this.props.schema.enum) {
                return (<EnumField {...newProps} />);
            }
            switch (this.props.schema.format) {
            case 'text':
                return (<TextField {...newProps} />);
            case 'date-time':
                return (<DateTimeField {...newProps} />);
            default:
                return (<StringField {...newProps} />);
            }
            break;
        case 'array':
            if (this.props.schema.items.enum) {
                return (<EnumArray {...newProps} />);
            }
            return (<ArrayField {...newProps} />);
        case 'object':
            if (this.props.schema.additionalProperties) {
                return (<Dictionnary {...newProps} />);
            }
            return (<ObjectField {...newProps} />);
        default:
            return (
                <div />
            );
        }
    }
});

export default Field;
