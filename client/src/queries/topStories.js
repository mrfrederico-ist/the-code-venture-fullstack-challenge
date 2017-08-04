import { gql } from 'react-apollo'

export default gql`
  query TopStories($first: Int, $after: Int, $reload: Boolean) {
    topStories(first: $first, after: $after, reload: $reload) {
      id
      title
      url
      score
      numComments
      creationDate
    }
  }
`
