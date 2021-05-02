import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  
  if (!token) {
    window.location.assign('/');
  }

  const [userData, setUserData] = useState({});

  const [removeBook] = useMutation(REMOVE_BOOK,{
    update(cache, { data: { removeBook } }) {
      cache.writeQuery({
        query: GET_ME,
        data: { me: removeBook, savedBooks: [...removeBook.savedBooks] }
      });
      setUserData(removeBook);
    }
  });

  const { data, loading, error }  = useQuery(GET_ME,{
    update(cache, { data: { me } }) {
      setUserData(me);
    },
    pollInterval: 1000,
  });

  
  // use this to determine if `useEffect()` hook needs to run again

  const userDataLength = Object.keys(data?data.me:{me:{}}).length;

  useEffect(() => {
    let isMounted = true;

    const getUserData = async () => {
        try {
          const token = Auth.loggedIn() ? Auth.getToken() : null;
  
          if (!token) {
            return false;
          }
  
          if (!error && !loading) {
            // console.log(me);
            if(isMounted){
              setUserData(data?data.me:{me:{}});
            }
          }

        } catch (err) {
          console.error(err);
        }
    };

    if(isMounted){
      getUserData();
    }
    return () => { isMounted = false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId }
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {!loading && userData && userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {!loading && userData && userData.savedBooks && userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <a href={`${book.link}`} target="_blank" rel="noopener noreferrer"><p>Link</p></a>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
