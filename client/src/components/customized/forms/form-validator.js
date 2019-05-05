class FormValidator {
  static isEmpty(input) {

    if(input === undefined || input === null)
      return true

    if((typeof input) === 'string'){
      if(input.trim().length === 0){
        return true
      }

      return false
    }

    return false
  }

  static validLength(input, min, max) {
    return this.inRange(input.length, min, max)
  }

  static inRange(value, min, max){
    if(value < min || value > max){
      return false
    }

    return true
  }

  static inRange(value, min) {
    if(value < min){
      return false
    }
    return true
  }
}

export default FormValidator