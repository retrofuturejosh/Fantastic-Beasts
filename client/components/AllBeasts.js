import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchBeasts } from '../store'
/**
 * COMPONENT
 */
export class AllBeasts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllBeasts()
  }

  render() {
    return (
      <div>
      {
        this.props.beasts.length && this.props.beasts.map(beast => {
          return (
            <li key={ beast.id }>{ beast.species }</li>
          )
        })
      }
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    beasts: state.beasts
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllBeasts: function () {
      dispatch(fetchBeasts())
    }
  }
}

const AllBeastsContainer = connect(mapState, mapDispatch)(AllBeasts)
export default AllBeastsContainer

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
