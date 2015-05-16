var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');


// Create a Card with title and subtitle
var main = new UI.Window({
    fullscreen: true,
});

var currentTime = new UI.Text({
    position: new Vector2(7, 2),
    size: new Vector2(62, 24),
    font: 'gothic-18-bold',
    text: '00:00',
    textAlign: 'left'
});

var currentDate = new UI.Text({
    position: new Vector2(75, 2),
    size: new Vector2(62, 24),
    font: 'gothic-18-bold',
    text: '9 Nov',
    textAlign: 'right'
});

var windSpeed = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'RESOURCE_ID_BITHAM_42_MEDIUM_NUMBERS',
    text: '0',
    textAlign: 'center'
});

var windDesc = new UI.Text({
    position: new Vector2(0, 92),
    size: new Vector2(144, 20),
    font: 'gothic-18-bold',
    text: 'knots',
    textAlign: 'center'
});

var currentTemp = new UI.Text({
    position: new Vector2(7, 135),
    size: new Vector2(62, 24),
    font: 'gothic-24-bold',
    text: '30C',
    textAlign: 'left'
});

var windDir = new UI.Text({
    position: new Vector2(75, 135),
    size: new Vector2(62, 24),
    font: 'gothic-24-bold',
    text: 'W',
    textAlign: 'right'
});

main.add(currentTime);
main.add(currentDate);
main.add(windSpeed);
main.add(windDesc);
main.add(currentTemp);
main.add(windDir);

// Display the Card
main.show();

// Contruct the request
var checkWind = function() { 
    ajax(
        {
            url: 'http://iphone.kiteboarding-club.com/weatherjson.php',
            type: 'json'
        },
        function(data) {
            // Extract data
            var time = data.time;
            var date = data.date;
            var wind = data.wind;
            var gusts = data.gusts;
            var temp = data.temperature;
            var direction = data.direction;

            // Clean date
            var dlength = date.length;
            var trim = dlength - 3;
            var cleandate = date.substring(0, trim);

            // Show to user
            if ( wind !== gusts ) {
                windSpeed.text(wind + '-' + gusts);
            } else {
                windSpeed.text(wind);
            }
            currentTime.text(time);
            currentDate.text(cleandate);
            currentTemp.text(temp + 'C');
            windDir.text(direction);
        },
        function(error) {
            // Failure!
            windDesc.text('Connection error');
        }

    );
};

// Set 5 minute interval
var interval = 1000 * 60 * 5;

// Make the requests
checkWind();
setInterval(checkWind, interval);


/*------- old --------

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Ghost',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/