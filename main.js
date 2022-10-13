function scratchCode(){
    radio.onReceivedNumber(function (receivedNumber) {
        if (control.deviceSerialNumber() < 500000) {
            basic.showLeds(`
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        } else {
            basic.showLeds(`
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    })
    radio.setGroup(1)
    basic.forever(function () {
        radio.sendNumber(0)
    })
    
    
    
}



