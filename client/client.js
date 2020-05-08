var leftButtonClickCount;

window.addEventListener('load', () => {

  // DATE TEXT
  fetch('http://localhost:5678/current_date_text')
    .then((response) => {
      return response.text()
    })
    .then((currentDateText) => {
      console.log(currentDateText);
      var main = document.querySelector(".current-date-text");
      main.textContent = currentDateText;
    });

  // LEFT BUTTON
  var leftButton = document.querySelector('.big-button');
  var greenClickCounter = leftButton.querySelector('span');

  getLeftButtonClickCount(greenClickCounter);

  leftButton.addEventListener('click', () => {
    leftButtonClickCount++;
    greenClickCounter.textContent = leftButtonClickCount;
    postLeftButtonClickCount(leftButtonClickCount);
  });
});

// LEFT BUTTON: GET
function getLeftButtonClickCount(clickCounterSpan) {
  try {
    fetch('http://localhost:5678/big_button')
      .then((response) => {
        return response.text()
      })
      .then((clickCount) => {
        leftButtonClickCount = clickCount;
        clickCounterSpan.textContent = clickCount;
      });
  } catch (error) {
    console.log(error);
  }
}

// LEFT BUTTON: POST
function postLeftButtonClickCount(clickCount) {
  fetch('http://localhost:5678/big_button', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    },
    body: String(clickCount)
  })
}

