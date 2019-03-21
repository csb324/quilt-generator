window.onload = function() {

  let button = document.getElementById('do-something');
  let testing = false;

  if (!button) {
    button = document.getElementById('test-something');
    testing = true;
  }

  const img = document.getElementById('app-img');
  const caption = document.getElementById('app-caption');

  function getQuilt() {
    if (!button.classList.contains('loading')) {
      button.classList.add('loading');
      img.classList.add('loading');

      fetch('https://quilt-generator.glitch.me/' + button.attributes['data-endpoint'].value)
        .then(response => response.json())
        .then(function(json) {
          var imgSrc = json['img'];
          var commentary = json['commentary'];

          caption.textContent = commentary;
          img.attributes.src.value = "data:image/jpeg;base64, " + imgSrc;
          button.classList.remove('loading');
          img.classList.remove('loading');
        });
      }
  }

  getQuilt();

  if(button) {
    button.addEventListener('click', getQuilt);
  }
};
