import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import { ToolbarTitle } from 'material-ui';

function mapStateToProps(state) {
    if (state.settings && state.settings.data) {
        return ({
            title: state.settings.data.site.title
        });
    }
    return ({});
}

const ToolbarLogo = React.createClass({
    propTypes: {
        title: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({ title: '' });
    },

    render() {
        return (
            <ToolbarTitle
                style={{
                    fontFamily: this.context.muiTheme.fontFamily,
                    fontWeight: 400,
                    color: '#fff',
                    paddingRight: 0,
                    textDecoration: 'none'
                }}
                text={this.props.title}
            />
        );
    }
});

export default connect(mapStateToProps)(ToolbarLogo);
