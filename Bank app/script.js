'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo = '' 

  if (amount > 0 && receiveAcc && currentAccount.balance >= amount && receiveAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);
  }
  updateUI(currentAccount)
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
  //delete account
    accounts.splice(index, 1)
  // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value =''
})

let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
//slice//không thay đổi arr gốc
console.log(arr.slice(2));
console.log(arr.slice(2, 4));

//splice
console.log(arr.splice(2));
console.log(arr);
//thay đổi arr gốc// xóa giá trị khỏi array

//reverse // đảo ngược array, thay đổi arr gốc
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse());
console.log(arr2);

//concat //join array 
const letters = arr.concat(arr2)
console.log(letters);

//join
console.log(letters.join(' - '));

const arr = [23, 11, 64];
console.log(arr([0]));

for (const movement of movements){
  if(movement >0){
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdraw ${Math.abs(movement)}`);
  }
}
console.log(`-----------`);
movements.forEach(function(movement){
  if(movement >0){
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdraw ${Math.abs(movement)}`);
  }
})

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
const checkDogs = function(arr1, arr2){
  const newArr1 = arr1.slice(1, -2); 
  const total = newArr1.concat(arr2)
  total.forEach(function(age, i){
    if(age >= 3){
      console.log(`Dog number ${i+1} is an adult, and is ${age} years old`);
    } else{
      console.log(`Dog number ${i+1} is a puppy`);
    }
  }
  )}

checkDogs(dogsJulia, dogsKate)

const deposits = movements.filter(function(mov){
  return mov > 0
})
console.log(movements);
console.log(deposits);
const withdrawal = movements.filter(mov => mov < 0)
console.log(withdrawal);

console.log(movements);
//accumulator => snowball
const balance = movements.reduce(function(acc, cur, i, arr){
  return acc + cur
}, 0);
console.log(balance);

//maximum value
const max = movements.reduce((acc, mov) => {
  if(acc > mov) 
    return acc;
  else
  return mov;
}, movements[0])
  const adultDogs = humanAge.forEach(function(dogAge, i){
    if(dogAge < 18) return humanAge.splice(i)
  })

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4]
const calAverageHumanAge = function(arr){
// calculate human age
  const humanAge = arr.map(function(age){
    if (age <= 2) 
    return 2 * age
    else
    return 16 + age * 4
  })
console.log(humanAge);
// check if dog > 18
const adultDogs = humanAge.filter(function(dogAge){
  return dogAge > 18
})
console.log(adultDogs);
// calculate average
const average = adultDogs.reduce((acc, age) =>{
  return (acc + age)
}) /adultDogs.length
console.log(average);
console.log(adultDogs.length);
}
calAverageHumanAge(data2)

const eurToUsd = 1.1;
movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov,0)

let isPalindrome = function(x){
  const reverse = String(x).split('').reverse().join('')
  return x == reverse;
}

const romanToInt = function(s) {

  const sym = { 
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
  }

  let result = 0;

  console.log(sym[s[i]]);

  for (i=0; i < s.length; i++){
      const cur = sym[s[i]];
      const next = sym[s[i+1]];

      if (cur < next){
          result += next - cur 
          i++
      } else {
          result += cur
      }
  }

  return result; 
}
  for(let j = 0; j < destructure.length; j++){
    for(let k = j + 1; k < destructure[k].length; k++)
    if(destructure[j][j] = destructure[k][j])
    arr.push(destructure[k][j])
  }

var longestCommonPrefix = function(strs) {
  let prefix = ""
  if(strs === null || strs.length === 0) return prefix

  for (let i=0; i < strs[0].length; i++){ 
      const char = strs[0][i] // loop through all characters of the very first string. 
      for (let j = 1; j < strs.length; j++){ 
        // loop through all other strings in the array
          if(strs[j][i] !== char) return prefix
      }
      prefix = prefix + char
  }

  return prefix}
longestCommonPrefix(["flower","flow","flight"])

var lengthOfLastWord = function(s) {
    let arr = s.split(' ')
    let lastWord = arr[arr.length -1].length
    return lastWord
};
lengthOfLastWord('hello world')

for(let i = 0; i < digits.length; i++){
  if(i === digits.length - 1){
    output.push(digits[i] + 1)
  } else {
    output.push(digits[i])
  }
}
console.log(output);

const plusOne = function(digits) {
  let output =[]
  let number = String(Number(digits.join('')) + 1)
  output = number.split('').map((num) => Number(num))
  return output
}
plusOne([9, 2, 7])
  for(let i = 0; i < (arr1.length < arr2.length? arr2.length : arr1.length); i++){
    if(arr1[i] === arr2[i] === '1') 

  }
    let arr1 = a.split('');
  let arr2 = b.split('')

let output = []
var addBinary = function(a, b) {
  a.split('')
  b.split('')
  console.log(a[0]);
  console.log(b[0]);
  console.log(Number(a[0] + b[0]));
  for(let i = 0; i < (a.length < b.length? b.length : a.length); i++){
  for (let j = 0; i < (a.length < b.length? a.length : b.length); j++){
    if(a[i] == b[j] == '1'){
      output.push(String(Number(a[i] + b[j]) - 1))}
    else {
    output.push(a[i] + b[j])
    } 
  }}
  console.log(output);
  return output
};
addBinary('11', '1')
*/
//ascending
var deleteDuplicates = function(head) {
    for (let i = 0; i < head.length; i++){
      for(let j = 1; j < head.length; j++){
        if(head[i] === head[j]){
          head.splice(j, 1)
          console.log(head);
        }
      }
    }
    return head
};
deleteDuplicates([[1,1,2,3,3]])