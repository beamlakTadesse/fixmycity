export function phonenumber(inputtxt) {
  var phoneno = /^\d{12}$/;
  if (inputtxt.match(phoneno)) {
    return null;
  } else {
    // alert("Incorrect Phone");
    return "Incorrect Phone";
  }
}
export function nameValidation(inputtxt) {
  var letters = /^[A-Za-z]+$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    // alert("Incorrect name");
    return false;
  }
}
export function CheckPassword(inputtxt) {
  var passw = /^[A-Za-z]\w{7,14}$/;
  if (inputtxt.match(passw)) {
    return true;
  } else {
    alert("Weak Password");
    return false;
  }
}
