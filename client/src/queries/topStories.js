import { gql } from 'react-apollo'

export default gql`
  query TopStories($first: Int, $after: Int) {
    topStories(first: $first, after: $after) {
      id
      title
      url
      score
      numComments
      creationDate
    }
  }
`
