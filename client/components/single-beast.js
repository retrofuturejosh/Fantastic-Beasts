import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
* COMPONENT
*/
export const SingleBeast = (props) => {

  const {singleBeast,beastId} = props
  const filteredBeast = singleBeast.beasts.length&&singleBeast.beasts.filter(beast => beastId === +beast.id)
  const beast = filteredBeast[0]

  return (beast)?(
   <div>
     <img src={`${beast.imageUrl || "favicon.ico"}`} width="128" height="128"/>
     <p>Current Beast is {`${beast.species}`} </p>
     <p>Category : {`${beast.category}`} </p>
     <p>Danger : {`${beast.danger}`} </p>
     <p>Friendliness : {`${beast.friendliness}`} </p>
     <p>Size : {`${beast.size}`} </p>
     <p>Care requirements : {`${beast.careRequirements}`} </p>
     <p>Training : {`${beast.training}`} </p>
     <p>Origin : {`${beast.origin}`} </p>
     <p>Price : {`${beast.price}`} </p>
     <p>Breeder Info : {`${beast.breederInfo}`} </p>
     <p>Quantity : {`${beast.quantity || "N/A"}`} </p>
   </div>
  ):(<div>nothing</div>)
}

/**
 * CONTAINER
 */
  const mapState = (state, ownProps) => {
    return {
      singleBeast:state.beasts,
      beastId:+ownProps.match.params.id
    }
  }
  export default connect(mapState)(SingleBeast)

  /**
   * PROP TYPES
   */
  SingleBeast.propTypes = {
    beast: PropTypes.array
  }
