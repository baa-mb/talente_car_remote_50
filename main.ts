control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    radio.sendValue("gerade", 0)
    radio.sendValue("kurve", 0)
})
function neigungen() {
    gerade = Math.min(Math.max(input.rotation(Rotation.Pitch), -45), 45)
    gerade = Math.round(gerade / g_empfind) * g_empfind
    kurve = Math.min(Math.max(input.rotation(Rotation.Roll), -45), 45)
}
input.onButtonPressed(Button.B, function () {
    if (ist_oben) {
        radio.sendValue("kupplung", 1)
    } else {
        radio.sendValue("kupplung", 0)
    }
    ist_oben = !(ist_oben)
})
let kurve = 0
let gerade = 0
let g_empfind = 5
let ist_oben = false
ist_oben = true
let alt_gerade = -99
let alt_kurve = -99
radio.setGroup(26)
basic.showString("26")

let k_empfind = 1
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    neigungen()
    if (input.buttonIsPressed(Button.A)) {
        if (gerade != alt_gerade || kurve != alt_kurve) {
            radio.sendValue("gerade", gerade)
            radio.sendValue("kurve", kurve)
        }
    }
    alt_gerade = gerade
    alt_kurve = kurve
})
