window.addEventListener('load', () => {
  const form = document.querySelector('#form'),
    iframe = document.querySelector('#iframe'),
    link = document.querySelector('#link'),
    scale = document.querySelector('#scale'),
    phone = document.querySelector('#phone'),
    display = document.querySelector('.display'),
    view = document.querySelector('.view'),
    docStyle = document.documentElement.style
  // Check for saved data
  chrome.storage.sync.get('color', function(data) {
    if (data) {
      if (data.phone) {
        docStyle.setProperty('--phone', `url(/${data.phone})`)
        if (data.phone.include('iphone')) {
          display.classList.add('iphone')
          view.classList.add('iphone')
        }
      }
      if (data.scale) {
        docStyle.setProperty('--scale', data.scale)
      }
    }
  })
  form.addEventListener('submit', ev => {
    ev.preventDefault()
    iframe.src = link.value
    return false
  })
  // Using function keyword to retain scope
  scale.addEventListener('change', function(ev) {
    docStyle.setProperty('--scale', this.value)
    chrome.storage.sync.set({ scale: this.value }, function() {
      console.log('Saved the scale size...')
    })
  })
  phone.addEventListener('change', function(ev) {
    display.classList.toggle('iphone')
    view.classList.toggle('iphone')
    docStyle.setProperty('--phone', `url(/${this.value})`)
    chrome.storage.sync.set({ phone: this.value }, function() {
      console.log('Saved the device type...')
    })
  })
})
