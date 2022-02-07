class Actions {
   getNumbersFromText(text) {
    return parseInt(text.replace( /^\D+/g, ''))
  }
}
export default new Actions()
