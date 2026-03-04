
// Calculate and display the result (2 + 2)
document.getElementById('calculation').textContent = 2 + 2;
document.querySelector('.myclass').textContent = 2 * 2;

function sumbitme() {
  alert('Button clicked!');
}

document.querySelector('button').addEventListener('click', sumbitme);



 const div = document.createElement('div');
 const img = document.createElement('img');
    img.src = 'robot.png';
    img.width = 50;
    div.appendChild(img);
    document.getElementById('imghere').appendChild(div);




  function updateColor(color) {
    document.getElementById('colorDisplay').textContent = 'My favorite color is ' + color ;
  }


