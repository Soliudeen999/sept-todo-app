// Creating Greeting Functions
const greet = (personsName) => {
    console.log(`Hello my friend ${personsName}`)
}

greet('Olaiya')


// Function to ADD 2 NUMBERS
function addTwoNumber(number1, number2) {
    return number1 + number2
}

console.log(addTwoNumber(51,90))
console.log(addTwoNumber(29,30))

// Functon to join 2 string
function joinStrings(str1, str2){
    const fullWord = `Your full word is  ${str1} ${str2}. Thank you`;
    const fullWord2 = "Your full word is " + str1 + ' ' + str2 + ". Thank you"
}

const joinedStrings = joinStrings('Ademola', 'Boluwatife')
console.log('From joined words: ', joinedStrings)


// Short method for declaring function
const getSqrt = (number) => Math.sqrt(number)

// console.log(getSqrt(25))

// Get score 
function getScore(studentScore){
    if(studentScore <= 40){
        console.log('Your score is ', studentScore)
        console.log("This is a failed mark")
        console.log('Please rewrite the test')
    }
    else{
        console.log("This is a bright student")
    }
}

// getScore(70)

// getScore(10)

// getScore(40)

// Calculate Score 2

function getGrade(mark){
    if(mark < 40){
        return "Fail"
    }else if(mark < 50 && mark >= 40) {
        return "Pass"
    }else if(mark < 60 && mark >= 50){
        return "Credit"
    }else if(mark < 70 && mark >=60){
        return "Very Good"
    }else{
        return "Distinction"
    }
}

const olumidScore = getGrade(43)

const danScore = getGrade(62)

const alexScore = getGrade(90)

// console.log("OlumidScore = ", olumidScore)
// console.log("DanScore = ", danScore)
// console.log("AlexScore = ", alexScore)

console.log('1')
console.log('2')
console.log('3')
console.log('4')
console.log('5')
console.log('6')
console.log('7')
console.log('8')
console.log('9')


// Looping
// console.log('While loop starts now')
// start = 1;
// while (start <= 20) {
//     console.log(start);
//     start++
// }

// console.log('FOR loop starts now')

// for (let index = 1; index <= 100; index++) {
//     console.log(index)
// }

let startAt = 20
do {
    console.log(startAt)
    startAt++
} while (startAt <= 50);