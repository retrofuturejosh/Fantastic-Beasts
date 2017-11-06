import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBeasts, setInput } from '../store'
/**
 * COMPONENT
 */
class AllBeasts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    this.props.getAllBeasts()
  }

  handleInputChange (evt) {
    this.setState({input:evt.target.value})
  }

  render() {
    const {beasts,handleCategoryChange, handleInputChange} = this.props
    return (
      <div>
        <div className='categories'>
          <select onChange={handleCategoryChange}>
            <option>Choose a Category</option>
            <option>Land</option>
            <option>Air</option>
            <option>Sea</option>
            <option>Fire</option>
          </select>
        </div>
        <div className='search'>
          <input
            type="text"
            onChange={this.handleInputChange}/>
        </div>
        {
          beasts.beasts.length && beasts.beasts.map(beast => {
            return beast.species.includes(this.state.input) ?
              (
               <li key={ beast.id }>{ beast.species }</li>
              ) : null
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
    beasts: state.beasts,
    input: state.input
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllBeasts: function () {
      dispatch(fetchBeasts())
    },
    handleCategoryChange (evt) {
      let category;
      if(evt.target) category = evt.target.value
      dispatch(fetchBeasts(category))
    }
  }
}

const AllBeastsContainer = connect(mapState, mapDispatch)(AllBeasts)
export default AllBeastsContainer

/**
 * PROP TYPES
 */
AllBeasts.propTypes = {
  beasts: PropTypes.array,
  input: PropTypes.string
}
