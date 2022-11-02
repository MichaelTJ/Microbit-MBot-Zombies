var level = 0;
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
            radioSig = radio.receivedPacket(RadioPacketProperty.SignalStrength)
            console.log(radioSig)
        })
        let radioSig = 0
        radio.setGroup(1)
        basic.forever(async function () {
            basic.showLeds(`
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                `)
            await basic.pause(500)
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                `)
            await basic.pause(500)
            radio.sendNumber(0)
        })
        
        
        
    
}



