class FormValidator {
  static isEmpty(input) {
    if(input === '' || input === undefined || input === null || input.trim().length === 0) {
      return true
    }

    return false
  }

  static validLength(input, min, max) {
    if(input.length < min || input.length > max){
      return false
    }

    return true
  }
}

export default FormValidator