/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main'
export { default as UserHome } from './user-home'
export { Login, Signup } from './auth-form'
export { default as singleBeast } from './single-beast'
export { default as allBeasts } from './AllBeasts'
export { CartContainer } from './cart'
export {PostedReviewContainer} from './postedreview'
export { default as PostReviewContainer } from './PostReview'
export { default as OrderCompleteContainer } from './OrderComplete'
