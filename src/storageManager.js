// sets the userId item in local storage and returns the id
const setUserId = (id) => {
  window.localStorage.setItem('userId', id);
  return id;
}

export {
  setUserId
};