/**
 *  @name soundFormats
 *  @description <p>Technically, due to patent issues, there is no single
 *  sound format that is supported by all web browsers. While
 *  <a href="http://caniuse.com/#feat=mp3">mp3 is supported</a> across the
 *  latest versions of major browsers on OS X and Windows, for example,
 *  it may not be available on some less mainstream operating systems and
 *  browsers.</p>
 *
 *  <p>To ensure full compatibility, you can include the same sound file
 *  in multiple formats, e.g. 'sound.mp3' and 'sound.ogg'. (Ogg is an
 *  open source alternative to mp3.) You can convert audio files
 *  into web friendly formats for free online at <a href="
 *  http://media.io/">media.io</a></p>.
 *
 *  <p>The soundFormats() method tells loadSound which formats
 *  we have included with our sketch. Then, loadSound will
 *  attempt to load the first format that is supported by the
 *  client's web browser.</p>
 *
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var song, fft;
var tx =[]; //变量
var ty = []; //变量
var big = []; //变量
var a = 0;//变量
var r = 0;//变量
function preload() {
  // we have included both an .ogg file and an .mp3 file
  soundFormats('ogg', 'mp3');

  // if mp3 is not supported by this browser,
  // loadSound will load the ogg file
  // we have included with our sketch
  song = loadSound('data/1.mp3');
}

function setup() {
  createCanvas(1500, 900);

  // song loaded during preload(), ready to play in setup()
  song.play();
  fft = new p5.FFT();
  fft.setInput(song);
  colorMode(HSB);
  for (var i = 0; i < 1024; i++) {//所有的
    tx[i] = 890+cos(r)*200;//x坐标
    ty[i] = 330+sin(r)*200;//y坐标
    r+=2*PI/1024;//增加
  }
}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause();
    background(255, 0, 0);
  } else {
    song.play(); // playback will resume from the pause position
    background(0, 255, 0);
  }
}
function draw() {
  background(0);

  var spectrum = fft.analyze();

  //beginShape();
  //.right.get(i)
  noStroke();
  for (i = 0; i<spectrum.length; i+=2) {
    // vertex(i, map(spectrum[i], 0, 255, height, 0) );
    fill(i/2, 255, 255);
    rect(i*1, 900-spectrum[i]*2, 3, spectrum[i]*2 );
  }
  //text(spectrum.length,80,80);
  //endShape();
  var w = -0.5*PI/1024;//角度
  //stroke(#FC6ED2);//颜色
  //strokeWeight(2);//线宽
  for (var i = 0; i <1024; i++) {
    big[i] = spectrum[i];
  }
  for (var i = 0; i <1024; i++) {//所有的
    stroke(i/3, 255, 255, 250);//颜色
    if (i == 1024-1) {//没到边界
      line(tx[i]+big[i]*1*cos(w), ty[i]+big[i]*1*sin(w), tx[0]+big[0]*1*cos(w), ty[0]+big[0]*1*sin(w));//线条
      line(tx[i]-big[i]*1*cos(w), ty[i]-big[i]*1*sin(w), tx[0]-big[0]*1*cos(w), ty[0]-big[0]*1*sin(w));//线条
    } 
     else//否则
    { 
      line(tx[i]+big[i]*1*cos(w), ty[i]+big[i]*1*sin(w), tx[i+1]+big[i+1]*1*cos(w), ty[i+1]+big[i+1]*1*sin(w));//线条
      line(tx[i]-big[i]*1*cos(w), ty[i]-big[i]*1*sin(w), tx[i+1]-big[i+1]*1*cos(w), ty[i+1]-big[i+1]*1*sin(w));//线条
    }
   // line(tx[i]+big[i]*1*cos(w), ty[i]+big[i]*1*sin(w), 321, 507);
    w+=2*PI/1024;//增加
  }
}