// import {userService} from '../services/user.service.js'

const initialState = {
  books: [],
  book: null,
  wishlist: [{ title: 'Only a Whisper', price: 2.78, rating: 2.1 },
  { title: 'Sea of Death', price: 16.35, rating: 4.2 }],
  currSortBy: "title"
};

export function bookReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state, books: [...action.books]
      }
    case "ADD_TO_WISHLIST":
      return {
        ...state, wishlist: [...state.wishlist, { "title": action.title, "price": action.price, "rating": action.rating }]
      }
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state, wishlist: [...state.wishlist].filter((book) => book.title !== action.bookTitle)
      }
    case "SET_SORT":
      return {
        ...state, currSortBy: action.currSortBy
      };

    default:
      newState = state
  }
  console.log('newState:', newState);

  // // groups[action.group].tasks:[...tasks]
  return newState;
}

// update task (groupIdtaskId){
//     finds group

//     dispatch(EDITGROUP)

// }