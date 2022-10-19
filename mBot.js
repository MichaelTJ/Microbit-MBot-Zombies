//mBot recieves instructions from microbit
class mBot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "mBot");
        globalScene.add.existing(this);
        this.speed = 20;
        //this.followText = globalScene.add.text(0, 0, id);
        //this.curActionFunctions = [];
        mBots.add(globalScene.physics.add.existing(this));
        this.setScale(0.05);
        this.setFriction(0.5);
    }
    stop(){
        this.setVelocity(0,0);
        this.setAngularVelocity(0,0);
    }
    driveForwards(){
        //stop in case of angular momentum
        this.stop();
        if(this.isObjectInFront()){
            this.setAngularVelocity(-20);
            return;
        }
        let newVel = globalScene.physics.velocityFromAngle(this.angle, this.speed);
        this.setVelocity(newVel.x,newVel.y);
    }
    driveBackwards(){
        //stop in case of angular momentum
        this.stop();
        let newVel = globalScene.physics.velocityFromAngle(this.angle, -this.speed);
        this.setVelocity(newVel.x,newVel.y);
    }
    turnLeft(){
        //stop in case of angular momentum
        this.stop();
        this.setAngularVelocity(-10);
    }
    turnRight(){
        //stop in case of angular momentum
        this.stop();
        this.setAngularVelocity(10);
    }
    zombie(){
        //TODO
    }
    isObjectInFront(){
        //send ray to check sprites
        //set ray position
        globalScene.ray.setOrigin(this.x, this.y);
        //set ray direction (in degrees)
        globalScene.ray.setAngleDeg(this.angle);
        //set ray's cone angle (in degrees)
        globalScene.ray.setConeDeg(30);
        //remvoe this from mapped objects
        globalScene.raycaster.mappedObjects = 
            globalScene.raycaster.mappedObjects.filter( mObj => mObj !== this );

        //cast rays in a cone
        let intersections = globalScene.ray.castCone();
        let smallestDist = Number.MAX_SAFE_INTEGER;
        //console.log(this._id);
        intersections.forEach(intersection => {
            if(intersection.object!=this){
                //get distance
                let dist = Phaser.Math.Distance.BetweenPoints(this,intersection);
                if(dist<smallestDist){
                    smallestDist=dist;}
            }
        });
        globalScene.raycaster.mapGameObjects(this);
        if(smallestDist<50){return true;}
        return false;
        //let hitObject = intersections.object;
        //let hitSegment = intersections.segment;
    }
    

}