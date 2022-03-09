import { bookService } from '../services/book.service.js';
import { utilService } from '../services/utils.service.js';


// **BOOK ACTIONS**

export function loadBooks() {
  return async (dispatch) => {
    try {
      const books = await bookService.query();
      console.log('books:', books);

      dispatch({
        type: "SET_BOOKS",
        books
      });
    } catch (err) {
      console.log('Cannot load books:', err);
      _setUserMsg(dispatch, 'Failed to load books, please check your internet connection')
    }
  }
}


export function addBookToWishlist(title, price, rating) {
  console.log('title:', title);
  return async (dispatch) => {
    try {
      dispatch({
        type: "ADD_TO_WISHLIST",
        title,
        price,
        rating
      })
    } catch (err) {
      console.log('Cannot add book:', err);
      _setUserMsg(dispatch, 'Failed to add book, please check your internet connection')
    }
  }
}

export function removeBookFromWishlist(bookTitle) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        bookTitle
      })

    } catch (err) {
      console.log('Cannot remove book:', err);
      _setUserMsg(dispatch, 'Failed to remove book, please check your internet connection')
    }
  }
}


export function updateSortBy(currSortBy) {
  console.log('safz');
  return (dispatch) => {
    dispatch({
      type: "SET_SORT",
      currSortBy
    })
  }
}












export function loadBook(bookId, currFilterBy = null) {

  return async (dispatch) => {
    try {
      const book = await bookService.getById(bookId, currFilterBy);
      dispatch({
        type: "SET_BOOK",
        book: book
      });
    } catch (err) {
      console.log('Cannot load book:', err);
      _setUserMsg(dispatch, 'Failed to load book, please check your internet connection')
    }
  }
}



export function updateBookTitle(bookToSave) {
  const miniBook = { title: bookToSave.title, _id: bookToSave._id }

  return async (dispatch) => {
    try {
      _setBackupBook(dispatch)
      dispatch({
        type: "SET_BOOK",
        book: bookToSave,
      })
      dispatch({
        type: "UPDATE_BOOKS",
        book: miniBook,
      })
      await bookService.updateBookTitle(bookToSave)
    } catch (err) {
      _restoreBook(dispatch)
      _setUserMsg(dispatch, 'Failed to update title, please check your internet connection')
      console.log('Cannot update book title:', err);
    }
  }
}

export function updateFilter(currFilterBy) {

  return (dispatch) => {

    dispatch({
      type: "SET_FILTER",
      currFilterBy: {
        ...currFilterBy
      }
    })

  }
}

export function updateSearch(search) {
  return (dispatch) => {
    dispatch({
      type: "SET_SEARCH",
      search: {
        search
      }
    })

  }
}
export function updateBooksSearch(search) {
  return (dispatch) => {
    dispatch({
      type: "SET_BOOKS_SEARCH",
      booksSearch: {
        search
      }
    })

  }
}

export function setBookNav(isBookNavOpen) {
  return (dispatch) => {
    dispatch({
      type: "SET_BOOK_NAV",
      isBookNavOpen: isBookNavOpen
    })
  }
}

export function saveBook(bookToSave) {
  return async (dispatch) => {
    _setBackupBook(dispatch)
    try {
      dispatch({
        type: "SET_BOOK",
        book: bookToSave,
      });
      await bookService.saveBook(bookToSave)
    } catch (err) {
      _restoreBook(dispatch)
      _setUserMsg(dispatch, 'Failed to save book, please check your internet connection')
      console.log('Err in saving book:', err);
    }
  }
}



// **GROUP ACTIONS**

export function saveGroup(groupToSave, bookToSave) {

  const groupIdx = bookToSave.groups.findIndex(
    (group) => groupToSave.id === group.id
  )
  bookToSave.groups[groupIdx] = groupToSave

  return saveBook(bookToSave)

}

export function addGroup(bookToSave, user) {
  const newGroup = bookService.getNewGroup(user)
  bookToSave.groups.unshift(newGroup);

  return saveBook(bookToSave)
  // return async (dispatch) => {
  //   _setBackupBook(dispatch)
  //   try {
  //     dispatch({
  //       type: "SET_BOOK",
  //       book: bookToSave,
  //     });
  //     await bookService.saveBook(bookToSave)
  //   } catch (err) {
  //     _restoreBook(dispatch)
  //     _setUserMsg(dispatch, 'Failed to save book, please check your internet connection')
  //     console.log('Err in saving book:', err);
  //   }
  // }
}

export function deleteGroup(groupId, bookToSave) {
  const filteredGroups = bookToSave.groups.filter((group) => {
    return group.id !== groupId;
  });
  bookToSave.groups = filteredGroups

  return saveBook(bookToSave)
}


// **TASK ACTIONS**

export function deleteTask(taskId, groupId, bookToSave) {
  const groupIdx = bookToSave.groups.findIndex((group) => groupId === group.id);
  const filteredTasks = bookToSave.groups[groupIdx].tasks.filter((task) => {
    return task.id !== taskId;
  })
  bookToSave.groups[groupIdx].tasks = filteredTasks;

  return saveBook(bookToSave)

}


export function addTask(taskTitle, groupId, bookToSave, user, activity) {

  activity.id = utilService.makeId()
  activity.byMember = user
  const newTask = bookService.addNewTask(taskTitle, activity)

  const groupIdx = bookToSave.groups.findIndex((group) => groupId === group.id);
  bookToSave.groups[groupIdx].tasks.push(newTask);
  return saveBook(bookToSave)

}

export function saveTask(taskToSave, groupId, bookToSave, user, activity, comment) {



  if (activity) {
    activity.id = utilService.makeId()
    activity.byMember = user
    taskToSave.activities = [activity, ...taskToSave.activities.slice(0, 5)]
  }
  if (comment) {
    comment.id = utilService.makeId()
    comment.byMember = user
    taskToSave.comments = [comment, ...taskToSave.comments.slice(0, 5)]
  }

  const groupIdx = bookToSave.groups.findIndex((group) => groupId === group.id);
  const updatedtasks = bookToSave.groups[groupIdx].tasks.map((task) => {
    return task.id === taskToSave.id ? taskToSave : task
  });
  bookToSave.groups[groupIdx].tasks = updatedtasks
  return saveBook(bookToSave)


}


// **BOOK BACK UP **

function _setBackupBook(dispatch) {
  dispatch({
    type: "SET_BACKUP_BOOK"
  })
}

function _restoreBook(dispatch) {
  dispatch({
    type: "RESTORE_BOOK"
  })
}

function _setUserMsg(dispatch, txt) {
  dispatch({ type: 'SET_MSG', msg: { txt } })


}

// **MODALS ACTIONS**

export function setActiveModal(activeModal) {

  return (dispatch) => {
    dispatch({
      type: "SET_ACTIVE_MODAL",
      activeModal: activeModal
    });
  };
}

export function setTaskModal(isTaskDetailsOpen) {
  return (dispatch) => {
    dispatch({
      type: "SET_TASK_MODAL",
      isTaskDetailsOpen: isTaskDetailsOpen
    })
  }
}