function scratchCode(){
    
    //put your microbit code here
    //instructions given to mBot through basic.showLeds()
    //there are wrappers for most functions.
    
    radio.setGroup(1);
    radio.onReceivedNumber(function (receivedNumber) {
        
        if (500000 > control.deviceSerialNumber()) {
            basic.showLeds(`
                # # # # #
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                `)
        }
        else{
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
            `)
        }
    })
    basic.forever(function () {
        radio.sendNumber(0)
    })
    basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
}



