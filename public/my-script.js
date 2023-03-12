fetch('http://localhost:5000/my-html-content')
  .then(response => response.text())
  .then(html => {
    document.querySelector('#my-html-content').innerHTML = html;
  });