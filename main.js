function scratchCode(){
    
    //paste your makecode microbit code here
    //instructions given to mBot through basic.showLeds()
    //unfortunately you have to put the word 'await' before 
    //  all 'basic.____' functions
    //Example: 'basic.pause(100)' becomes 'await basic.pause'

    //You will also have to put 'async' in front of function
    //Example:
    //radio.onReceivedNumber(function (receivedNumber) {
    //becomes:
    //radio.onReceivedNumber(async function (receivedNumber) {
    
    radio.onReceivedNumber(async function (receivedNumber) {
        if (control.deviceSerialNumber() < 500000) {
            await basic.showLeds(`
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            await basic.pause(500)
            await basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                `)
            await basic.pause(500)
        } else {
            await basic.showLeds(`
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                `)
            await basic.pause(500)
                
        }
        
        radio.sendNumber(0)
    })
    radio.setGroup(1)
    basic.forever(async function () {
        radio.sendNumber(0)
    })
    
}



