var startTime = null;
var interval = null;
const secondsInMinute = 60;
const secondsInHour = 60 * 60;
var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var message = document.getElementById("message");
var getup = document.getElementById("getup");
var pause = document.getElementById("pause");
var control = document.getElementById("control");
var time_in_minutes = 60;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);


getup.addEventListener("click", reset_clock);
pause.addEventListener("click", toggle_clock);

function getString(n) {
    if (n < 10) {
        return "0" + String(n);
    } else {
        return String(n);
    }
}

function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor(t/(1000*60)); //Minutes exceed 60, not using hours
	return {'total':t, 'minutes':minutes, 'seconds':seconds};
}

var timeinterval;

function run_clock(endtime){
	function update_clock(){
		var t = time_remaining(endtime);
		minutes.innerHTML = getString(t.minutes);
		seconds.innerHTML = getString(t.seconds);
		message.innerHTML = ":"
		if(t.total<=0){ 
			clearInterval(timeinterval); 
			minutes.innerHTML = "";
			seconds.innerHTML = "";
			message.innerHTML = "GET UP"
		}
	}
	update_clock(); // run function once at first to avoid delay
	timeinterval = setInterval(update_clock,1000);
}

var paused = true; // is the clock paused?
var time_left; // time left on the clock when paused

function pause_clock(){
	if(!paused){
		paused = true;
		clearInterval(timeinterval); // stop the clock
		time_left = time_remaining(deadline).total; // preserve remaining time
	}
}

function resume_clock(){
	if(paused){
		paused = false;

		// update the deadline to preserve the amount of time remaining
		deadline = new Date(Date.parse(new Date()) + time_left);

		// start the clock
		run_clock(deadline);
	}
}

function toggle_clock(){
    if (paused) {
        control.className = "fa fa-pause"
        resume_clock();
    } else if (!paused) {
        control.className = "fa fa-play"
        pause_clock();
    }
}

function reset_clock() {
	deadline = new Date(Date.parse(new Date()) + time_in_minutes * 60 * 1000);
	if (paused == true && timeinterval == null) {
		control.className = "fa fa-pause";
		run_clock(deadline);
	} else {
		control.className = "fa fa-pause";
		clearInterval(timeinterval);
		run_clock(deadline);
	}
	time_left = time_remaining(deadline).total;
	paused = false;
}

