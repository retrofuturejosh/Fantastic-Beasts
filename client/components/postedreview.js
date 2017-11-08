import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostedReview extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1>Your review has been posted!</h1>
        )
    }
}

const mapState = () => {
    return {}
}

const mapDispatch = () => {
    return {}
}

const PostedReviewContainer = connect(mapState, mapDispatch)(PostedReview)
export default PostedReviewContainer