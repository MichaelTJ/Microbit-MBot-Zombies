function scratchCode(){
    radio.onReceivedNumber(function (receivedNumber) {
        basic.showLeds(`
            # # # # #
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    })
    radio.setGroup(1)
    basic.forever(function () {
        radio.sendNumber(0)
    })
    
    
}



