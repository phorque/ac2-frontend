import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';

import { translateErrors } from 'utils/errors';

const StringField = React.createClass({
    propTypes: {
        schema: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        record: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            record: '',
            errors: { values: [] }
        });
    },

    handleChange(event) {
        return (this.props.onChange(event.target.value));
    },

    renderEdit() {
        const valueField = (
            <TextField
                fullWidth
                errorText={translateErrors(this.props.errors.values, this.context.translation)}
                value={this.props.record}
                floatingLabelText={this.props.title}
                onChange={this.handleChange}
            />
        );
        return (valueField);
    },

    renderValue() {
        let secondaryText;

        if (this.props.record) {
            secondaryText = <p>{this.props.record}</p>;
        } else {
            secondaryText = <p>{this.context.translation.t('texts.emptyField')}</p>;
        }

        return (
            <ListItem
                disabled={!this.props.editable}
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.title}
                secondaryText={secondaryText}
            />
        );
    },

    render() {
        return (this.props.editable ? this.renderEdit() : this.renderValue());
    }
});

export default StringField;
