const imu = require("node-sense-hat").Imu;
const JoystickLib = require("node-sense-hat").Joystick;
const senseLeds = require('sense-hat-led');
const v = [0, 255, 0];
const _ = require('lodash');
const lodash = _;
const server = require('./server.js');

var positionBar = 2;

const IMU = new imu.IMU();
const INCLINATION = 0.3;

const barra = [v, v, v, v];
const BAR_LENGTH = barra.length;

server.start();

var X = [0, 0, 255];  // Red
var O = [0, 0, 0];  // White

var questionMark = [
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
];

senseLeds.setPixels(questionMark);

setInterval(() => {

	senseLeds.getPixels((err, pixelArray)=>{

	var arrayNueva = _.clone(pixelArray);
	arrayNueva.splice(56,8);
	const newLine = [0, 0, 0, 0, 0, 0, 0, 0];

	const lastRow = newLine.map((elem,i)=>{
		if(i < positionBar || i >= positionBar + BAR_LENGTH){
			return O
		}
		return v;
	});


	senseLeds.setPixels([...arrayNueva,...lastRow]);

	});

	IMU.getValue((err, data) => {
	  if (err !== null) {
	    console.error("Could not read sensor data: ", err);
	    return;
	  }
	  if (data.accel.x <= -INCLINATION) {
	  	if(positionBar > 0){	positionBar--;	}
	  } else if (data.accel.x >= INCLINATION){
	  		if(positionBar < 4){	positionBar++;	}
	  }
	  console.log("Accelleration is: ", data.accel.x);
	});

	//if(positionBar < 4){	positionBar++;	}
	

},200);


/*

setInterval(() => {

	IMU.getValue((err, data) => {
	  if (err !== null) {
	    console.error("Could not read sensor data: ", err);
	    return;
	  }

	  console.log("Accelleration is: ", data.accel.x,data.accel.y);
	  //console.log("Gyroscope is: ", JSON.stringify(data.gyro, null, "  "));
	  //console.log("Compass is: ", JSON.stringify(data.compass, null, "  "));
	  /*console.log("Fusion data is: ", JSON.stringify(data.fusionPose, null, "  "));

	  console.log("Temp is: ", data.temperature);
	  console.log("Pressure is: ", data.pressure);
	  console.log("Humidity is: ", data.humidity);
	});


},5000);
*/

