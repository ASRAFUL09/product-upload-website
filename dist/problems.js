// 1. find products by tags
// 2. empty an array
// 3. check is a number inteser or not
// 4. duplicate an array
// 5. revarse a number
// 6. make a string alphabetic
// 7. capitalize an string
// 8. how many time a charecter in a string show it as a object showing the number of time charecter is in there
// 9. how to sum an array of numbers
// 10. separate string and number from an array
// 11. delete non male from an array of object
// 12. create a function with two argumet one with an array of number and other is single number and the fuction will return the an array amount that much number what the single number has
// 13. check how many time a number in a array and return the most numbered one
// 14. shuffle an array
// 15. join two array and show only uniqe numbers

// 1
const tags = "fashion, shirt, cloths,"

function getTags(tag) {
  return tag.split(",").join("").includes("cloths");
}
console.log(getTags(tags));

// 2
const arr = [1, 2, 3, 4];
arr.length = 0
console.log(arr);

// 3 
const num = 12.5;
if (num%1 === 0) {
  console.log("the number is inteser");
} else {
  console.log("the number is not inteser");
}

// 4
function duplicate(arr){
  return [...arr, ...arr]
}
console.log(duplicate([1, 2, 3, 4, 5]));

// 5
function revarseNumber(num){
  return Number(num.toString().split("").reverse().join("")) 
}
console.log(revarseNumber(23));

// 6
function alphabetic(str){
 return str.split("").sort().join("")
}
console.log(alphabetic("cat"));

// 7
function capitalize(word) {
  let words = word.split(" ").map(element => {
    return element.charAt(0).toUpperCase() + element.substring(1)
  });
  
  console.log();
  return words.join(" ")
}
console.log(capitalize("how are you"));

// 8 
function obj(params) {
  let occurese = {};
  let duplicateArr = [];
  params.split("").forEach(element => {
    if (occurese.hasOwnProperty(element) === false) {
      occurese[element] = 1;
    } else {
      occurese[element] ++
    }
    if(occurese[element]> 1){
      duplicateArr.push(element)
    }

  });
  // get it as a array
  console.log(duplicateArr);

  return occurese
}
console.log(obj("applle"));

// 9
const numbers = [1, 2, 10, 8, 10, 5, 5];
let sum = 0;
numbers.forEach(num =>{
  sum = sum + num;
})
console.log(sum);

let newNum = numbers.reduce((a, b) =>{
 if (a > b) {
   return a;
  } else {
   return b;
 }
})
console.log(newNum);

// find duplicate from an array of numbers
const uniqueNum = new Set();
const dup = []
numbers.forEach(item =>{
  if (uniqueNum.has(item)) {
    dup.push(item)
  }else{
    uniqueNum.add(item)
  }
})
console.log(dup);

// 10
function separate(arr) {
  let str = [];
  let num = [];
  arr.forEach(item =>{
    if (typeof item === "string") {
      str.push(item)
    } else {
      num.push(item)
    }
  })
  console.log(str);
  console.log(num);
  return str
}
console.log(separate([1, 3, "hello", 3, "moneky", "cat"]));

// 11 doing it without using filter
const persons = [
  {name: "rayhan", gender: "male"},
  {name: "yakub", gender: "male"},
  {name: "hero alom", gender: "none"},
  {name: "pori moni", gender: "female"},
  {name: "zayed khan", gender: "female"},
]

let count = 0;
persons.forEach(person =>{
  if (person.gender !== "male") {
    count++
  }
})

for (let i = 0; i < count; i++) {
  for (let j = 0; j < persons.length; j++) {
    if (persons[j].gender !== "male") {
     const newArr = [...new Set(persons.splice(j, 1))];
     console.log(newArr);
    }  
  }
}
console.log(count);
console.log(persons);

// 12
function retrive(arr, n = 1) {
  if (arr.length >= n) {
    for (let i = 0; i < n; i++) {
      console.log(arr[arr.length -1 -i]);    
    }  
  }else{
    console.log(n+ " ta number nai vai");
  }
}
retrive([1, 2, 3, 4, 5], 3);

// 13
function freq(arr) {
  const obj = {}
  arr.forEach(item =>{
    if (obj.hasOwnProperty(item)) {
      obj[item] ++
    }else{
      obj[item] = 1
    }
  })
  console.log(obj);

  const ans = Object.keys(obj).reduce((total , current)=>{
    if (obj[total] > obj[current]) {
      return total
    } else {
      return current
    }
  })
  console.log(ans);
}
freq([1, 2, 3, 4, 3,3, 4, 5, 6, 6]);

// 14
function shuffleArr(arr) {
  let arrLen = arr.length;
  if (arrLen > 0) {
    arrLen--
    let randomNumber = Math.floor(Math.random(arr) * arr.length);
    let temp = arr[arrLen];
    arr[arrLen] = arr[randomNumber];
    arr[randomNumber] = temp
  }
 console.log(arr) ;  
}
shuffleArr([1, 2, 3, 4, 5, 6]);

// 15
function union(arr1, arr2) {
  console.log([...new Set(arr1.concat(arr2))]);
}
union([1, 2, 3, 4, 5], [1, 3, 4, 6])

