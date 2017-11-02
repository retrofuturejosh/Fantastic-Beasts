import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { beast } from '../store'

/**
* COMPONENT
*/
export const SingleBeast = (props) => {
 const { beast } = props
 console.log(props)

 return (
   <div>
     <h3>Current Beast is {`${beast.species}`} </h3>
   </div>
 )
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
    return {
      beast: state.beast,
      id: ownProps.match.params.id
    }
  }
  
  export default connect(mapState)(SingleBeast)
  
//   /**
//    * PROP TYPES
//    */
//   UserHome.propTypes = {
//     email: PropTypes.string
//   }