const btnSunshineDom = document.querySelector('.btn-sunshine')
const btnKettleDom = document.querySelector('.btn-kettle')

const wateringDom = document.querySelector('.watering')
const sunshineDom = document.querySelector('.sunshine')

const plantDom = document.querySelector('.plant')
const timeDom = document.querySelector('.time')
const skyDom = document.querySelector('.sky')
const textDom = document.querySelector('.text span')

let state = {
    phase: 'idle',
    click: 1,
    speed: 1000,
    life: 4,
    end: function () {
        return state.click == state.life
    },
    updatePlant: function () {
        if (!state.end()) {
            state.click += 1

            plantDom.src = 'assets/plant-' + state.click + '.png'
        }
    }
}

btnSunshineDom.addEventListener('click', e => {
    if (state.phase == 'idle' && !state.end()) {
        state.phase = 'sunshine'

        btnSunshineDom.src = 'assets/sunshine-pressed.png'
        sunshineDom.style.display = 'block'

        // disappear after 3s
        setTimeout(() => {
            btnSunshineDom.src = 'assets/sunshine.png'
            sunshineDom.style.display = 'none'

            state.updatePlant()
            state.phase = 'idle'
        }, state.speed)
    }
})

btnKettleDom.addEventListener('click', e => {
    if (state.phase == 'idle' && !state.end()) {
        state.phase = 'watering'

        btnKettleDom.src = 'assets/kettle-pressed.png'
        wateringDom.style.display = 'block'

        // disappear after 3s
        setTimeout(() => {
            btnKettleDom.src = 'assets/kettle.png'
            wateringDom.style.display = 'none'

            state.updatePlant()
            state.phase = 'idle'
        }, state.speed)
    }
})


function updateTime() {
    const config = {
        0: 0,
        1: 0.1,
        2: 0.2,
        3: 0.3,
        4: 0.4,
        5: 0.5,
        6: 0.6,
        7: 0.7,
        8: 1.0,
        9: 1.0,
        10: 1.0,
        11: 1.05,
        12: 1.1,
        13: 1.1,
        14: 1.1,
        15: 1.0,
        16: 1.0,
        17: 1.0,
        18: 0.9,
        19: 0.7,
        20: 0.5,
        21: 0.4,
        22: 0.2,
        23: 0.1
    }
    const d = new Date()
    let hour = d.getHours()
    let time = new String(hour).padStart(2, '0') + ':' + new String(d.getMinutes()).padStart(2, '0')
    timeDom.innerHTML = time

    // day and night change
    skyDom.style = `filter: brightness(${config[hour]});`

    setTimeout(updateTime, 1000)
}

updateTime()


window.onload = function () {
    while (true) {
        let name = prompt('Enter Your Name: ')
        if (name) {
            textDom.innerHTML = name
            break
        }
    } 123
}