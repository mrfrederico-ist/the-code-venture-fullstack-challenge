import { gql } from 'react-apollo'

export default gql`
  query StoryComments($id: Int) {
    storyComments(id: $id) {
      ...CommentsRecursive
    }
  }

  fragment CommentsRecursive on Comment {
    ...CommentFields
    comments {
      ...CommentFields
      comments {
        ...CommentFields
      }
    }
  }

  fragment CommentFields on Comment {
    id
    hasKids
    author
    text
  }
`
