import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, UserHome, singleBeast, allBeasts, PostReviewContainer, OrderCompleteContainer } from './components'
import CartContainer from './components/cart'
import AllBeastsContainer from './components/AllBeasts'
import CheckoutFormContainer from './components/CheckoutForm'
import PostedReview from './components/postedreview'
import {me,fetchBeasts} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={allBeasts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/singleBeast/:id" component={singleBeast} />
            <Route exact path='/' component={AllBeastsContainer} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/beasts/:id" component={singleBeast} />
            <Route path="/cart" component={CartContainer} />
            <Route exact path="/checkout" component={CheckoutFormContainer} />
            <Route exact path="/ordercomplete" component={OrderCompleteContainer} />
            <Route exact path="/postedreview" component={PostedReview} />
            {/* <Route path="/cart" component={CartContainer} /> */}
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route exact path="/home" component={UserHome} />
                <Route path="/cart" component={CartContainer} />
                <Route path="/postreview" component={PostReviewContainer} />
                <Route path="/ordercomplete" component={UserHome} />
                <Route exact path="/postedreview" component={PostedReview} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            {<Route component={Login} />}
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchBeasts())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
