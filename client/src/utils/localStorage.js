const storageName = 'saved_books_';

export const getSavedBookIds = () => {
  const email = localStorage.getItem('email');
  const savedBookIds = localStorage.getItem(storageName + email)
    ? JSON.parse(localStorage.getItem(storageName + email))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  const email = localStorage.getItem('email');
  if (bookIdArr.length) {
    localStorage.setItem(storageName + email, JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem(storageName + email);
  }
};

export const removeBookId = (bookId) => {
  const email = localStorage.getItem('email');
  const savedBookIds = localStorage.getItem(storageName + email)
    ? JSON.parse(localStorage.getItem(storageName + email))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem(storageName + email, JSON.stringify(updatedSavedBookIds));

  return true;
};

export const saveEmail = (email) => {
  if (email) {
    localStorage.setItem('email', JSON.stringify(email));
  } else {
    localStorage.removeItem('email');
  }
};