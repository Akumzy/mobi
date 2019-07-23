window.addEventListener('load', () => {
  const form = document.querySelector('#form'),
    iframe = document.querySelector('#iframe'),
    link = document.querySelector('#link'),
    scale = document.getElementById('scale'),
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
    //get the selected device
    let selectedId = this.options[this.selectedIndex].id

    //loop through options add/remove class if selected or not
    for (i = 0; i < phone.length; i++) {
      let device = phone.options[i].id
      if (selectedId === device) {
        display.classList.add(device)
        view.classList.add(device)
      } else {
        display.classList.remove(device)
        view.classList.remove(device)
      }
    }
    // scale down to 50% to fit the view
    if (this.value.includes('ipad')) {
      scale.value = '0.5'
      docStyle.setProperty('--scale', '0.5')
    }
    docStyle.setProperty('--phone', `url(/${this.value})`)
    chrome.storage.sync.set({ phone: this.value }, function() {
      console.log('Saved the device type...')
    })
  })
})
