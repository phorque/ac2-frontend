import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageForm from 'components/pages/page-form';

const EventNew = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (<PageForm model="Page::Event" />);
    }
});

export default EventNew;
