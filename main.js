var song = "";
left_wrist_X = 0;
left_wrist_y = 0;
right_wrist_X = 0;
right_wrist_y = 0;
left_wrist_number_Y = 0;
remove_decimals = 0;
//volume = 0;
score_right_wrist = 0;
score_left_wrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(400, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log('Posenet is Intitialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wrist_X = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_X = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist X=" + left_wrist_X + "Left wrist Y=" + left_wrist_y);
        console.log("right Wrist X=" + right_wrist_X + "right wrist Y=" + right_wrist_y);
        console.log("Score= " + score_left_wrist);
    }
}

function draw() {
    image(video, 0, 0, 400, 600);
    fill("#FF0000");
    stroke("#FF0000");
    if (score_left_wrist > 0.2) {
        circle(left_wrist_X, left_wrist_y, 20);
        left_wrist_number_Y = Number(left_wrist_y);
        remove_decimals = floor(left_wrist_number_Y);
        volume = remove_decimals / 500;
        document.getElementById('volume').innerHTML = "Volume= " + volume;

        song.setVolume(volume);
    }
    if (score_right_wrist > 0.2) {
        circle(right_wrist_X, right_wrist_y, 20);
        if (right_wrist_y > 0 && right_wrist_y <= 100) {
            document.getElementById('speed').innerHTML = "speed= 0.5x";
            song.rate(0.5);
        } else if (right_wrist_y > 100 && right_wrist_y <= 200) {
            document.getElementById('speed').innerHTML = "speed= 1x";
            song.rate(1);
        } else if (right_wrist_y > 200 && right_wrist_y <= 300) {
            document.getElementById('speed').innerHTML = "speed= 1.5x";
            song.rate(1.5);
        } else if (right_wrist_y > 300 && right_wrist_y <= 400) {
            document.getElementById('speed').innerHTML = "speed= 2x";
            song.rate(2);
        } else if (right_wrist_y > 400) {
            document.getElementById('speed').innerHTML = "speed= 2.5x";
            song.rate(2.5);
        }

    }
}


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}