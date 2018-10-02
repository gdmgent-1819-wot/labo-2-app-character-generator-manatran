const pixels = document.querySelectorAll('.pixel');

let pixelArray = [];

for(let i = 0; i<pixels.length; i++) {
  // seed pixelarray
  pixelArray.push(0);
  // define current pixel
  const pixel = pixels[i];
  // add click listener
  pixel.addEventListener('click', e => {
    // toggle class and value
    pixel.classList.toggle('lit');
    if (pixelArray[i] == 0){
      pixelArray[i] = 1;
    }
    else if (pixelArray[i] == 1){
      pixelArray[i] = 0;
    }
    console.log(pixelArray);
  });
}