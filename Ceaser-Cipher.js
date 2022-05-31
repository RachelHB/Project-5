function enDeCode(){
    let userString = document.getElementById("userMessage").value; //getting inout from user
    let encode = document.getElementById("encode"); //finds out if user wants encode or decode
    let userKey = document.getElementById("userKey").value; //getting value of user defined key
    let cleanString = (userString.trim())/*.toUpperCase()*/; //deleting any spaces the user may add in.
    let outputMessage = [];
    let flag = true;
  
    //setting flags for Encode and Decode (true or false)
    if (encode.checked) {
      flag = true;
    } else{
    flag = false;
    }
    //for every letter the user enters it runs through the functions to determine the new encoded or decode letter
    for (let i = 0; i < cleanString.length; i++){
      outputMessage.push(codeLetter(cleanString[i], userKey, flag));
    }
  
    document.getElementById("output").value = outputMessage.join("");
  }
  
  
  //finds the letter from the Array
  function convertIndexToLetter(index){
    let alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
    let letter = alphabet[index];
    return letter;
    //console.log(letter);
  }
  
  //finds the numeric version of the letter found in the above array
  function convertLetterToIndex(letter){
    let alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
    index = alphabet.indexOf(letter);
    return index;
  }

  
  //This stage creates the new incremented number using the Userkey chosen by the user.
  //I have added a extra Shift Key for the user to select an additional amount for the number to be incremented by.
  //A further extension would be to make the Shift Key a rolling substitution for where a sequence is defined by myself and the Shift Key value would run through the sequence applying a new value to each letter.
  function calculateNewIndex(letter, userKey, encode ){
    let index = Number(convertLetterToIndex(letter));
    let shiftkey = document.getElementById("shiftkey").value;

    if (encode) { 
        index = index + Number(userKey) +  Number(shiftkey); //adding new shift key value
      } else {
        index = index - Number(userKey) - Number(shiftkey); //subtracting new shift key value
      }  

      //wrapping the alphabet if the end or start is reached      
      if (index > 25){
        index = index - 26;
      } else if (index < 0) {
        index = index + 26;
      }

      return index;
    
    };
  
    //using the regular expressions, this section is checking the user input for lowercase letters. I have tried to incorporate validation for Capitals but they are not being incoded. 
  function codeLetter(letter, userKey, flag){
    //deal with non letter like space or number
    let letterRegEx = /[^a-z]/ || /[^A-Z]/; 
    
    if (letterRegEx.test(letter)){
      return letter;
    } else {
      let newIndex = calculateNewIndex(letter, userKey, flag);
      let codedLetter = convertIndexToLetter(newIndex);
      return codedLetter;
    }
  };

  