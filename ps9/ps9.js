// when button is clicked - it runs this function
document.getElementById('btn').addEventListener('click', function() {
    var city = document.getElementById('cityInput').value.trim();
    if (!city) return alert('Please enter a city name.');

    // load weather.json using AJAX

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'weather.json', true); // requesting the data and true - Means we want it to work in the background (asynchronously)
    // wait for response to arrive
    xhr.onreadystatechange = function() {
      // readystate - tells you what stage the xhr is in
      // Holds the status of the XMLHttpRequest.
      // 0: request not initialized
      // 1: server connection established
      // 2: request received
      // 3: processing request
      // 4: request finished and response is ready
      if (xhr.readyState === 4) { // file is fully loaded and sent
        if (xhr.status === 200) { // file loaded successfully
          var data = JSON.parse(xhr.responseText).cities; // city response text parsed into js object
          // find function implemented on data array that contains the json file 
          // For each item in the array, it checks if the name matches what the user typed.
          var found = data.find(function(item) {  // searching city array to find input city
            return item.name.toLowerCase() === city.toLowerCase();
          });
          var out = document.getElementById('result'); 
          if (found) {  // if city found, displaying its data
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