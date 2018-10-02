const pixels = document.querySelectorAll('.pixel');
const submit = document.querySelector('button');

// custom function to replace character at certain index
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let pixelString = '';

for(let i = 0; i<pixels.length; i++) {
  // seed pixelString
  pixelString += '0';
  // define current pixel
  const pixel = pixels[i];
  // add click listener
  pixel.addEventListener('click', e => {
    // toggle class and value
    pixel.classList.toggle('lit');
    if (pixelString.charAt(i) == '0'){
      pixelString = pixelString.replaceAt(i, '1');
    }
    else if (pixelString[i] == '1'){
      pixelString = pixelString.replaceAt(i, '0');
    }
  });
}

submit.addEventListener('click', e => {
  e.preventDefault();
  firebase.database().ref('arcade-characters').push({'string':pixelString});
  console.log('tzal wel gelukt zijn');
})