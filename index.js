const API_KEY = '267661405310808a6d3a8d68d76799b1'
const elIconWeather = document.getElementById('icon-weather')
const elTemperature = document.getElementById('temperature')
const elLocal = document.getElementById('local')
const elHumidity = document.getElementById('humidity')
const elSpeedwind = document.getElementById('speed-wind')
const elcard = document.querySelector('.card')



function getData(local) {
  const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`
  return fetch(route).then(response => response.json())
}

function loadinformation() {
  const value = document.querySelector('[name= "city"]').value

  getData(value).then(data => {
    if(data.cod =='404'){
      elcard.classList.remove('active')
      return
    }

    elcard.classList.add('active')

    elTemperature.innerHTML = Math.floor(data.main.temp) + '°C'
    elLocal.innerHTML = data.name
    elHumidity.innerHTML = data.main.humidity + '%'
    elSpeedwind.innerHTML = data.wind.speed + 'km/h'

    const icon = data.weather[0].main.toLocaleLowerCase()
    const src = `assets/icons/${icon}.png`
    elIconWeather.setAttribute('src', src)

    fadeIn()
  })



}


function handleSubimit(event) {
  event.preventDefault()
  fadeOut()



}

function fadeIn() {
  const timeline = gsap.timeline()
  const configFrom = { y: -50 }
  const configTo = { y: 0, duration: 0.4, opacity: 1, ease: 'back' }

  timeline.fromTo('#icon-weather', configFrom, configTo)
  timeline.fromTo('#temperature', configFrom, configTo, 0.1)
  timeline.fromTo('#local', configFrom, configTo, 0.2)
  timeline.fromTo('footer', configFrom, configTo, 0.3)
}

function fadeOut() {
  const timeline = gsap.timeline({ onComplete: loadinformation })
  const config = { y: 50, duration: 0.4, opacity: 0, ease: 'slow' }
  timeline.to('footer', config)
  timeline.to('#local', config, 0.1)
  timeline.to('#temperature', config, 0.2)
  timeline.to('#icon-weather', config, 0.3)
}



document.querySelector('form').addEventListener('submit', handleSubimit)