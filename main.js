function scratchCode(){
    
    //put your microbit code here
    //instructions given to mBot through basic.showLeds()
    //there are wrappers for most functions.
    
    radio.setGroup(1);
    radio.onReceivedNumber(function (receivedNumber) {
        if (500000 > radio.receivedPacket(RadioPacketProperty.SerialNumber)) {
            basic.showLeds(`
                # # # # #
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                `)
        }
    })
    basic.forever(function () {
        radio.sendNumber(0)
    })
    
}



