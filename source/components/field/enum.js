import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Chip from 'material-ui/Chip';

import ListItem from 'material-ui/List/ListItem';

const EnumField = React.createClass({
    propTypes: {
        record: PropTypes.string,
        schema: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return { selected: null };
    },

    handleTouchTap(value) {
        this.setState({ selected: value });
        return (this.props.onChange(value));
    },

    renderField() {
        return (
            this.props.schema.enum.map((possibleValue) => {
                const isSelected = this.props.record === possibleValue || this.state.selected === possibleValue;
                return (
                      <Chip
                          key={possibleValue}
                          style={{ margin: '4px 4px 4px 0', display: 'inline-block' }}
                          onTouchTap={() => this.handleTouchTap(possibleValue)}
                          backgroundColor={
                              isSelected ? '#999' : '#cacaca'
                          }
                      >
                          {this.props.translation.t(`${this.props.label}.${possibleValue}`)}
                      </Chip>
                );
            })
        );
    },

    renderEdit() {
        const valueField = (
            <ListItem
                disabled
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <div>
                        {this.props.title}
                        <div>
                            {this.renderField()}
                        </div>
                    </div>
                }
            />
        );
        return (valueField);
    },

    renderValue() {
        return (
            <ListItem
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.title}
                secondaryText={<p>{this.props.record || this.props.translation.t('texts.emptyField')}</p>}
            />
        );
    },

    render() {
        return (this.props.editable ? this.renderEdit() : this.renderValue());
    }
});

export default EnumField;
