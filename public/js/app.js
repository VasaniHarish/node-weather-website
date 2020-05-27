const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""

  const location = address.value

  const url = '/weather?address=' + location

  fetch(url).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error

    } else {
      messageOne.textContent = data.Location
      messageTwo.textContent = data.forecast
    }
  })
})

  console.log(location + '\n' + url);  
})

