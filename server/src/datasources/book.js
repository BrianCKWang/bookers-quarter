const { RESTDataSource } = require('apollo-datasource-rest');


class GoogleBookAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://www.googleapis.com/books/v1/';
  }

  bookReducer(book) {
    return {
      bookId: book.id,
      authors: book.volumeInfo.authors || ['No author to display'],
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail || ''
    };
  }

  async getBook(query) {
    // Send a GET request to the specified endpoint
    // return this.get(`volumes?q=${query}`);
    // return this.get(`volumes?q=martian`);
    const response = await this.get(`volumes?q=${query}`);
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // console.log(query);
    return Array.isArray(response.items)
      ? response.items.map(book => this.bookReducer(book))
      : [];
  }
}
module.exports = GoogleBookAPI;
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };