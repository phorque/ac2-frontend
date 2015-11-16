import React from "react";
import { connect } from "react-redux"
import {
  Toolbar,
  ToolbarGroup,
  Paper,
  FlatButton
} from 'material-ui'
import { FormattedMessage } from "react-intl"
import { bindActionCreators } from "redux"

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

import LoginForm from "components/login-form"

import api from "api"

function mapStateToProps(state) {
  return { isLoggedIn: !!state.currentUser }
}

let authenticate = (fields) => api.actions.tokens.create(fields)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate}, dispatch)
}

let LoginPage = (props) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup key={1} float="right">
          <FlatButton label="À propos" />
        </ToolbarGroup>
      </Toolbar>

      <div className="row">

        <aside className="col-lg-6 column">
        </aside>

        <section className="col-lg-4" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>

        <LoginForm onSubmit={props.authenticate} />

       </section>
     </div>
   </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)