import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { CardTitle } from 'material-ui/Card';

import Link from 'components/link';

import PageAvatar from 'components/pages/page-avatar';

const PageCardTitle = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        children: PropTypes.node,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <CardTitle
                style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}
                title={
                    <Link to={`/profiles/${this.props.page.id}`} onBlack>
                        <PageAvatar page={this.props.page} />
                        {this.props.page.title}
                    </Link>
                }
            >
                <div>
                    {this.props.children}
                </div>
            </CardTitle>
        );
    }
});

export default PageCardTitle;
