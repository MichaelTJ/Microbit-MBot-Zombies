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

    //numLights => Driving instructions
    //0 => stop()
    //5 => driveBackwards()
    //10 => driveForwards()
    //15 => turnLeft()
    //20 => turnRight()

    radio.onReceivedNumber(function (receivedNumber) {
        curReading = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        if (prevReading < curReading) {
            //Do nothing (continue driving in current direction)
        } else {
            if (curDirection == 0) {
                // Drive Backwards
                basic.showLeds(`
                    # # # # #
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
                curDirection = 1
            } else {
                // Drive Forwards
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
                curDirection = 0
            }
        }
        prevReading = curReading
    })
    let prevReading = 0
    let curReading = 0
    let curDirection = 0
    curDirection = 0
    curReading = 0
    prevReading = 0
    basic.forever(function () {
        
    })
    
    
    
        
        
        
        
    
}



