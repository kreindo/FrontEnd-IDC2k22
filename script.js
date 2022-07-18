const img = document.getElementById('gambar');const buttons = document.querySelectorAll('.button');
const playButton = buttons[3];
const playButtonElement = playButton.children[0];
const links = document.getElementById('links');
const dicoding = document.getElementById('dicodingLink');


dicoding.innerText = 'Belajar Programming di Dicoding';
dicoding.innerHTML = '<i>Belajar Programming di Dicoding</i>';

img.setAttribute('height', 215);
img.setAttribute('width', 300);
playButtonElement.setAttribute('type', 'submit');

for (const button of buttons) {
  button.children[0].style.borderRadius = '6px';
}
