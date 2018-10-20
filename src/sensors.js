
const imu = require("node-sense-hat").Imu;
const JoystickLib = require("node-sense-hat").Joystick;
const server = require('./server.js');


server.start();
const IMU = new imu.IMU();

// const pressCallback = (direction) = {
//
//   	// const sensorData = null;
//
//   	IMU.getValue((err, data) => {
//   		if (err !== null) {
// 		    console.error("Could not read sensor data: ", err);
// 		    return;
// 			}
// 		// sensorData = data;
//   	});
//
//   	switch(direction) {
//   		case "up":
//   		 	console.log("Temp is: ", sensorData.temperature);
//   		 	break;
//   		 case "down":
//   		 	console.log("Humidity is: ", sensorData.humidity);
//   		 	break;
//   	}
// }



const holdCallback = (direction) => {

  	const sensorData = null;

  	IMU.getValue((err, data) => {
  	// 	if (err !== null) {
		 //    console.error("Could not read sensor data: ", err);
		 //    return;
    // }
		 //  sensorData = data;
  	// });

	  	switch(direction) {
	  		case "up":
	  			console.log("Gyroscope is: ", JSON.stringify(data.gyro, null, "  "));
	  		 	break;
	  		case "down":
	  			console.log("Temp is: ", data.temperature);
	  			break;
	  	}
  	});
}


JoystickLib.getJoystick().then(joystick => {
  joystick.on("hold", holdCallback);
});



setInterval(() => {

	IMU.getValue((err, data) => {
	  if (err !== null) {
	    console.error("Could not read sensor data: ", err);
	    return;
	  }
	  console.log("Accelleration is: ", JSON.stringify(data.accel, null, "  "));
	  console.log("Gyroscope is: ", JSON.stringify(data.gyro, null, "  "));
	  console.log("Fusion data is: ", JSON.stringify(data.fusionPose, null, "  "));
	});


},1000);


