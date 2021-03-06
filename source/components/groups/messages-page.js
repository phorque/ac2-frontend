import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageContainer from 'components/pages/page-container';
import GroupMessages from 'components/groups/group-messages';
import MainLayout from 'components/main-layout';

const GroupMessagesFactory = React.createFactory(GroupMessages);

const GroupMessagesPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <MainLayout>
                <PageContainer
                    {...this.props}
                    factory={GroupMessagesFactory}
                    id={this.props.params.resourceId}
                    storeName="groups"
                />
            </MainLayout>
        );
    }
});

export default GroupMessagesPage;
