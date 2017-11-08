import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1><a href="/">Fantastic Beasts</a></h1>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="navbar-brand">Home</Link>
              <a href="/postreview" onClick={() => props.history.push('/postreview')} className="navbar-brand">Post Review</a>
              <a href="/cart" onClick={() => props.history.push('/cart')} className="navbar-brand">Cart</a>
              <a href="#" onClick={handleClick} className="navbar-brand">Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login" className="navbar-brand">Login</Link>
              <Link to="/signup" className="navbar-brand">Sign Up</Link>
              <a href="/cart" onClick={() => props.history.push('/cart')} className="navbar-brand">Cart</a>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    filtered: []
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
