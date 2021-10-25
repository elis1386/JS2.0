
// let clients = ['Василий', 'Семен','Екатерина','Владимир','Валентина']
// let  clientsV = clients.filter(function(client) {
//     return client.charAt(0) == "В"

// })
// console.log(clientsV);

// const prices = [53,107, 81,45,35]

// let less50 = prices.find(function(element) {
//     return element < 50
// })
// console.log(less50)

// const userId = [323,78903,0943,400]

// let isOnline = userId.includes(400)
// console.log(isOnline)

// let numbers = [1,2,4,3,8,5,9,6,345,234,6]
// let maxNum = numbers[0]
// numbers.forEach(function(number){
//     if(number > maxNum){
//         maxNum = number
//     } 
// })
// console.log(maxNum)


// const users = [
//     {
//         name: 'Alex',
//         gender: 'male'
//     },
//     {
//         name: 'Ann',
//         gender: 'female'
//     },
//     {
//         name: 'Kirsi',
//         gender: 'female'
//     },
//     {
//         name: 'Timo',
//         gender: 'male'
//     },
// ]

// const withAppeal = users.map(function(user) {
//     if (user.gender === 'male') {
//         return user.push(`appeal: 'Mr'`)
//     }
//     return user.push({appeal: 'Mrs'})
// })
// console.log(users)


const requestURL = 'https://jsonplaceholder.typicode.com/users'

fetch(requestURL,{
    method: 'POST'
})
.then(response => response.json())
.then(data => {
    console.log(data)
})
