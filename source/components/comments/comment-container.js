import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import Immutable from 'immutable';

import actionCreators from 'action-creators';

import api from 'api';

import Comment from './comment';

const defaultProps = {
    likes: Immutable.Map({})
};

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.comment.sender_id),
        likes: state.likesByComment.get(props.comment.id)
    };
}

const CommentContainer = React.createClass({
    propTypes: {
        sender: PropTypes.object,
        comment: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        removeResource: PropTypes.func.isRequired,
        likes: PropTypes.object.isRequired,
        pushNotification: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return { commentEditModalOpen: false };
    },

    myLike() {
        return (this.props.likes.find((like) => like.permissions.destroy));
    },

    handleLikeCreate() {
        api.likes.create({
            liked_id: this.props.comment.id,
            liked_type: 'Comment'
        }).then(
            (response) => {
                this.props.addResource(response);
            },
            () => {
                this.props.pushNotification('like_create_fatal_error');
            }
        );
    },

    handleLikeDestroy() {
        const myLike = this.myLike();

        api.likes.destroy(myLike.id).then(
            () => {
                this.props.removeResource(myLike);
            },
            () => {
                this.props.pushNotification('like_destroy_fatal_error');
            }
        );
    },

    handleCommentDestroy() {
        api.comments.destroy(this.props.comment.id).then(() => {
            this.props.removeResource(this.props.comment);
        });
    },

    handleOpenCommentEditModal() {
        this.setState({ commentEditModalOpen: true });
    },

    handleCloseCommentEditModal() {
        this.setState({ commentEditModalOpen: false });
    },

    render() {
        if (!this.props.sender) {
            return (<div />);
        }

        return (
            <Comment
                sender={this.props.sender}
                likes={this.props.likes}
                comment={this.props.comment}
                commentEditModalOpen={this.state.commentEditModalOpen}
                onCloseCommentEditModal={this.handleCloseCommentEditModal}
                onOpenCommentEditModal={this.handleOpenCommentEditModal}
                onLikeDestroy={this.handleLikeDestroy}
                onLikeCreate={this.handleLikeCreate}
                onCommentDestroy={this.handleCommentDestroy}
                myLike={this.myLike()}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(CommentContainer);
