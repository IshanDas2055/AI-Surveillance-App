object = [];
video = "";
status1 = "";

function preload()
{
   video = createVideo("video.mp4");
}

function setup()
{
   canvas = createCanvas(450,330);
   canvas.center();
   video.hide();
}

function draw() 
{
    image(video,0,0,480,360);
    if(status1 != "")
    {
       objectdetector.detect(video, gotResults);
       for(i = 0; i < object.length;i++)
       {
         document.getElementById("detection").innerHTML= "Status : Objects Detected ";
         document.getElementById("no_of_objects").innerHTML="No Of Objects Detectted : " + object.length;
       
         fill("coral");
         percent = floor(object[i].confidence * 100);
         text(object[i].label+" "+ percent + "%" , object[i].x + 15 , object[i].y + 15 );
         noFill();
         stroke("coral");
         rect(object[i].x , object[i].y ,object[i].width ,object[i].height);
      }
  }  
}
function start()
{
   objectdetector = ml5.objectDetector("cocossd",ModelLoaded);
   document.getElementById("detection").innerHTML= "Status : Detecting Objects";
}

function ModelLoaded()
{
    console.log("Model Loadedd")
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,result)
{
if(error)
{
   console.log(error);
}
console.log(result);
object = result;
}