document.getElementById('btn').addEventListener('click', function() {
    var city = document.getElementById('cityInput').value.trim();
    if (!city) return alert('Please enter a city name.');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'weather.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText).cities;
          var found = data.find(function(item) {
            return item.name.toLowerCase() === city.toLowerCase();
          });
          var out = document.getElementById('result');
          if (found) {
            out.innerHTML = 
              '<h2>' + found.name + '</h2>' +
              '<p>Temperature: ' + found.temperature + '</p>' +
              '<p>Humidity:    ' + found.humidity    + '</p>' +
              '<p>Condition:   ' + found.condition   + '</p>';
          } else {
            out.innerHTML = '<p>City not found in repository.</p>';
          }
        } else {
          console.error('Error loading weather.json:', xhr.status);
        }
      }
    };
    xhr.send();
  });