import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import CheckIcon from 'material-ui/svg-icons/navigation/check';

import IconButton from 'material-ui/IconButton';

const defaultProps = {
    style: {},
    endIconThreshold: 20
};

const Loader = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        loadingMore: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        endIconThreshold: PropTypes.number.isRequired,
        style: PropTypes.object
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        const border = 40;
        const size = 60;

        const iconButtonStyle = {
            width: border + size,
            height: border + size
        };

        const iconStyle = {
            width: size,
            height: size,
            background: '#fff',
            borderRadius: size / 2,
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
        };

        const loadingStyle = {
            marginTop: border / 2,
            marginBottom: border / 2,
            width: size,
            display: 'inline-block'
        };

        const {
            resources, endIconThreshold, hasMore, loadingMore, onLoadMore, style, children
        } = this.props;

        return (
            <div style={{ width: '100%' }}>
                <div style={style}>
                    {children}
                </div>
                <div
                    style={{
                        textAlign: 'center'
                    }}
                >
                    {resources.size === 0 && !hasMore && !loadingMore &&
                        <div>
                            <IconButton
                                onTouchTap={onLoadMore}
                                style={iconButtonStyle}
                                iconStyle={iconStyle}
                            >
                                <RefreshIcon color={this.context.muiTheme.palette.accent3Color} />
                            </IconButton>
                            <p
                                style={{
                                    color: this.context.muiTheme.palette.accent3Color
                                }}
                            >
                                {this.context.translation.t('labels.noRecords')}
                            </p>
                        </div>
                    }
                    {hasMore && !loadingMore &&
                        <IconButton
                            onTouchTap={onLoadMore}
                            style={iconButtonStyle}
                            iconStyle={iconStyle}
                        >
                            <MoreIcon color={this.context.muiTheme.palette.accent3Color} />
                        </IconButton>
                    }
                    {resources.size > endIconThreshold && !hasMore && !loadingMore &&
                        <IconButton
                            onTouchTap={onLoadMore}
                            style={iconButtonStyle}
                            iconStyle={iconStyle}
                        >
                            <CheckIcon color={this.context.muiTheme.palette.accent3Color} />
                        </IconButton>
                    }
                    {resources.size <= endIconThreshold && !hasMore && !loadingMore &&
                        <div style={iconButtonStyle} />
                    }
                    {loadingMore &&
                        <div style={loadingStyle}>
                            <RefreshIndicator
                                size={size}
                                top={0}
                                left={0}
                                loadingColor={this.context.muiTheme.palette.accent1Color}
                                status="loading"
                                style={{
                                    position: 'relative',
                                    display: 'inline-block'
                                }}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
});

export default Loader;
