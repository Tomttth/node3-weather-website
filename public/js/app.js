console.log("Hello This is javascript Message")

fetch('http://puzzle.mead.io/puzzle').then((response)=>{

response.json().then((data)=>{

    console.log(data)

})
})



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent=''

weatherForm.addEventListener('submit',(event)=>{

    event.preventDefault()//prevents default behaviour -renloading the page


    const location = searchElement.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{


response.json().then((data)=>{

    if(data.error) {

        messageOne.textContent = data.error
    } else {

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    }

})
})

    


})