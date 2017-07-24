const TIMING_DELAY = 200; // send signal for 200ms

const exec = require('child_process').execSync;

// clean start
exec('gpio write 4 1');
exec('gpio mode 4 out');

const TOGGLE_DOOR = function() {
  exec('gpio write 4 1');
  exec('gpio mode 4 out');
  exec('gpio write 4 0');
  setTimeout(() => {
    exec('gpio write 4 1');
  }, TIMING_DELAY);
}


var server = require('diet') // Require Diet
var app = server()           // Create App
app.listen('http://localhost/')

app.get('/', ($) => {
  $.redirect('/index.html');
});

app.get('/toggle', ($) => {
  TOGGLE_DOOR();
  $.end('done');
})

// Require diet-static
var static = require('diet-static')({ path: app.path+'/static' })

// Attach static as a global footer
app.footer(static);
