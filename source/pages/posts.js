import React from "react"
import { connect } from 'react-redux'

import {
    List,
    FlatButton
} from "material-ui"

import PostForm from "components/post-form"

import { posts } from "api"
import { Post, ActionCable } from "components"

function mapStateToProps(state, props) {
    let posts
    if (!props.params.pageId) {
        posts = state.posts
    }
    else {
        posts = state.posts.filter((post) => {
            return (post.sender_id == props.params.pageId || post.recipient_id == props.params.pageId)
        })
    }

    return {
        posts: posts.sort((post1, post2) => (post1.updated_at > post2.updated_at ? -1 : 1))
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

const Posts = React.createClass({
    getInitialState() {
        return { page: 1 }
    },

    componentDidMount() {
        this.loadPosts(this.props.params.pageId, 1)
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId != newProps.params.pageId) {
            this.loadPosts(newProps.params.pageId, 1)
        }
    },

    loadPosts(pageId, pageNum) {
        let query = { include: "sender,recipient" }

        if (pageId) {
            query["filter[participant_id]"] = pageId
        }

        query["page[number]"] = pageNum
        query["page[size]"] = 25
        query["sort"] = "-updated_at"

        posts.find(query)
    },

    loadMorePosts() {
        const nextPage = this.state.page + 1

        this.setState({ page: nextPage })
        this.loadPosts(this.props.params.pageId, nextPage)
    },

    render: function() {
        const posts = this.props.posts.map(post => <Post key={post.id} post={post} />)
        return (
            <ActionCable channel="PostsChannel">
                <div className="container-fluid" style={{paddingTop: 12}}>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                        <PostForm className="col-xs-12" />
                        <List>
                            {posts}
                        </List>
                        <FlatButton label="Load more" style={{width: "100%", padding: 8}} onClick={this.loadMorePosts} />
                    </div>
                </div>
            </ActionCable>
        );
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
