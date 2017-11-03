import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { beasts } from '../store'

/**
* COMPONENT
*/
export const SingleBeast = (props) => {
 const { beast } = props
 console.log('line 11-is this an array?:',beast)

 return (
   <div>
     <p>Current Beast is {`${beast.species}`} </p>
     <p>Category : {`${beast.category}`} </p>
     <p>Danger : {`${beast.danger}`} </p>
     <p>Friendliness : {`${beast.friendliness}`} </p>
     <p>Size : {`${beast.size}`} </p>
     <p>Care requirements : {`${beast.careRequirements}`} </p>
     <p>Training : {`${beast.training}`} </p>
     <p>Origin : {`${beast.origin}`} </p>
     <img src={`${beast.imageUrl}`} />
     <p>Price : {`${beast.price}`} </p>
     <p>Breeder Info : {`${beast.breederInfo}`} </p>
     <p>Quantity : {`${beast.quantity}`} </p>
   </div>
 )
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {

 console.log('line 36-ownProps:',ownProps.match.params.id)
    return {
      beast: state.beasts.filter(beast => +ownProps.match.params.id === +beast.id)
    }
  }

  export default connect(mapState)(SingleBeast)

//   /**
//    * PROP TYPES
//    */
//   UserHome.propTypes = {
//     email: PropTypes.string
//   }
