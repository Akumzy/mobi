
let move = false
let onView = 0
async function init () {
    const form = $('#form')
    const urlField = $('#form #bar')

    // Global
    form.addEventListener('submit', (ev) => {
        ev.preventDefault()
        $(`#${onView ? 'device-view' : 'resizable-view'} #iframe`).src = urlField.value
    })
    $('#reload').addEventListener('click', () => {
        $(`#${onView ? 'device-view' : 'resizable-view'} #iframe`).src.src = urlField.value
    })

    $('#view-type').addEventListener('change', function () {
        switch (this.selectedIndex) {
            case 0:
                $('#resizable-view').classList.remove('hidden')
                $('#device-view').classList.add('hidden')
                $('#resizable-view #iframe').src = urlField.value
                document.documentElement.classList.replace('device', 'plain')
                onView = 0
                break;
            case 1:
                $('#device-view').classList.remove('hidden')
                $('#resizable-view').classList.add('hidden')
                $('#device-view #iframe').src = urlField.value
                document.documentElement.classList.replace('plain', 'device')
                onView = 1
                break;
            default:
                break;
        }
    })
    //Plain view
    plainView()

    // Device view
    deviceView()
}
function plainView () {
    const frameRight = $('.resizable-frame.right')
    const overlay = $('#resizable-overlay')
    const initialPosition = sessionStorage.getItem('initial-position')
    if (initialPosition) {
        $('#resizable-view').style.width = `${initialPosition}px`
        setDisplayWidth(initialPosition)
    } else {
        setDisplayWidth(window.innerWidth)
    }
    frameRight.addEventListener('mousedown', () => {
        move = true
        overlay.classList.remove('pointer-none')
        document.addEventListener('mousemove', onMove)
    }, false)

    document.addEventListener('mouseup', () => {
        move = false;
        overlay.classList.add('pointer-none')
        document.documentElement.style.removeProperty('cursor')
        document.removeEventListener('mousemove', onMove)
    })
}
function deviceView () {
    const docStyle = document.documentElement.style
    const view = $('#device-view')
    $('#scale').addEventListener('change', function (ev) {
        docStyle.setProperty('--scale', this.value)
    })

    $('#device').addEventListener('change', function (ev) {
        //get the selected device
        let selectedId = this.options[this.selectedIndex].id

        //loop through options add/remove class if selected or not
        for (i = 0; i < $('#device').length; i++) {
            let device = $('#device').options[i].id
            if (selectedId === device) {
                $('.display').classList.add(device)
                view.classList.add(device)
            } else {
                $('.display').classList.remove(device)
                view.classList.remove(device)
            }
        }
        // scale down to 50% to fit the view
        if (this.value.includes('ipad')) {
            scale.value = '0.5'
            docStyle.setProperty('--scale', '0.5')
        }
        docStyle.setProperty('--phone', `url(/devices/${this.value})`)

    })
}
/**
 * 
 * @param {number} size 
 */
function setDisplayWidth (size) {
    $('#dimension').textContent = `${size - 15}px`
}
/**
 * 
 * @param {MouseEvent} ev 
 */
function onMove (ev) {
    if (move) {
        document.documentElement.style.setProperty('cursor', 'ew-resize')
        $('#resizable-view').style.width = `${ev.x}px`
        sessionStorage.setItem('initial-position', ev.x)
        setDisplayWidth(ev.x)
    }
}


/**
 * @param {string} selector 
 * @returns {HTMLElement}
 */
function $ (selector) {
    return document.querySelector(selector)
}


window.onload = init