import React from "react"
import { connect } from 'react-redux'

import {
  Paper,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from "material-ui"

import { FormattedMessage } from "react-intl"

import UserAvatar from "components/user-avatar"

function mapStateToProps(state, props) {
    return {
        sender: state.users.get(props.post.sender_id) || { profile: { name: "" } }
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

const Post = React.createClass({
    render() {
        let senderInfos;
        switch (this.props.post.sender_type) {
          case "User":
            senderInfos =
              <div>
                <UserAvatar user={this.props.sender} />
                <ToolbarTitle text={this.props.sender.profile.name} />
              </div>
            break;
        }

        return (
          <Paper style={{marginTop: 24}}>
            <Toolbar>
              <ToolbarGroup key={1} float="left">
                {senderInfos}
              </ToolbarGroup>
            </Toolbar>
            <div style={{padding: 24}}>
              {this.props.post.data.body}
            </div>
          </Paper>
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
