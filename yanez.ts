function checkInput(input: string): [boolean, string] {
    input = input.replace(/\s/g, '')

    let isNotNumeric: boolean = isNaN(input as any)
    let messages: string = ""
    let isValid: boolean = true

    if (isNotNumeric) {
      isValid = false
      messages = "Input must contain numbers only"
    }

    let returnStatus: [boolean, string] = [isValid, messages]
    return returnStatus
}

function luhnValidate(digitsString: string): boolean {
        let checksum = Array.from(digitsString)
            .reverse()
            .map((char, index) => {
                let digit = Number(char);
                digit = index % 2 == 1 ? digit * 2 : digit;
                digit = digit > 9 ? digit - 9 : digit;
                return digit;
            })
            .reduce((previous, current) => previous + current);

        return checksum % 10 == 0;
    }

function checkCreditCardNumber(creditcardNumber: string): [boolean, string] {
    creditcardNumber = creditcardNumber.replace(/\s/g, '')

    let messages: string = "The number is valid"
    let isValid: boolean = true

    if(creditcardNumber.length <= 1) {
      isValid = false
      messages = "The length of the credit card number is incorrect"
    }
    else {
      isValid = luhnValidate(creditcardNumber);
      if(!isValid) {
        messages = "The number is not valid"
      }
    }

    let returnStatus: [boolean, string] = [isValid, messages]
    return returnStatus

}



function main() {
  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Insert Credit Card's Number: ", function(creditcard) {
    let creditcardStatus: [boolean, string];

    creditcardStatus = checkInput(creditcard)

    if(creditcardStatus[0]) {
      creditcardStatus = checkCreditCardNumber(creditcard)
    }

    let isValid: boolean = creditcardStatus[0];
    let messages: string = creditcardStatus[1];

    console.log(messages)
    const status: number = (isValid ? 0 : 42)
    rl.close();
    process.exit(status)
  });
}

main();
