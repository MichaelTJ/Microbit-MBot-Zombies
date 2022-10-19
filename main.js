function scratchCode(){}
    
    //put your microbit code here
    //instructions given to mBot through basic.showLeds()
    //there are wrappers for most functions.
    
    basic.forever(async function () {
        basic.showLeds(`
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            console.log('before');
            await basic.pause(3000)
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                `)
            console.log('after');
            await basic.pause(3000)
    })
    


    return 'leave these last 2 lines';
}



