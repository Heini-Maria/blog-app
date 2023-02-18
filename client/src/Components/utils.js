function prettyDate(date) {
  let dateModify = date.toString().substr(0, 10);
  console.log(dateModify);
  let result =
    dateModify.slice(8, 10) +
    "/" +
    dateModify.slice(5, 7) +
    "/" +
    dateModify.slice(0, 4);
  return result;
}

export default prettyDate;
