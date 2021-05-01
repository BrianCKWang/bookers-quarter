import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_BOOK = gql`
  query book($query: String!) {
    book(query: $query) {
      bookId
      authors
      title
      description
      image
    }
  }
`;