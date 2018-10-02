const pixels = document.querySelectorAll('.pixel');
const submit = document.querySelector('button');

let pixelArray = [];

for(let i = 0; i < pixels.length; i++) {
  // seed pixelArray
  pixelArray.push([0,0,0]);
  // define current pixel
  const pixel = pixels[i];
  // add click listener
  pixel.addEventListener('click', e => {
    // toggle class and value
    pixel.classList.toggle('lit');
    if (JSON.stringify(pixelArray[i]) === JSON.stringify([0,0,0])){
      pixelArray[i] = [255,255,255];
    }
    else if (JSON.stringify(pixelArray[i]) === JSON.stringify([255,255,255])){
      pixelArray[i] = [0,0,0];
    }
  });
}

submit.addEventListener('click', e => {
  e.preventDefault();
  firebase.database().ref('arcade-characters').push({'char':pixelArray});
  console.log('tzal wel gelukt zijn');
})