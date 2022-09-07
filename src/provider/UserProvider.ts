class UserProvider {
  emailValidation(email: string) {
    let regexValidation =
      /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    if (regexValidation.test(email)) {
      return true;
    }
    return false;
  }

  passwordValidation(password: string) {
    let regex =
      /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$/;
    if (password.length >= 8) {
      if (regex.test(password)) {
        return true;
      }
    }
    return false;
  }
}

export { UserProvider };
