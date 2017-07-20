const TIMING_DELAY = 200; // send signal for 200ms

const exec = require('child_process').exec;
const TOGGLE_DOOR = function() {
  exec('gpio write 4 1', (err, so, se) => {
    exec('gpio mode 4 out', (err, so, se) => {
      exec('gpio write 4 0', (err, so, se) => {
        setTimeout(() => {
          exec('gpio write 4 1', (err, so, se) => {
            console.log('door toggled');
          });
        }, TIMING_DELAY);
      })
    });
  });
}


var server = require('diet') // Require Diet
var app = server()           // Create App
app.listen(8000)

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
