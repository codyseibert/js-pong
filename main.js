const $pong = $('#pong');
const $playerPadel = $('#player-padel');
const $aiPadel = $('#ai-padel');
const $ball = $('#ball');
const $restart = $('#restart');

const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DOWN_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

let interval = null;
let aiPadel = null;
let ball = null;

$restart.click(function() {
  init();
})

function init () {
  aiPadel = {
    direction: 1,
    SPEED: 1,
    top: 0
  }

  ball = {
    top: 240,
    left: 460,
    angle: UP_LEFT,
    speed: 5
  }

  interval = setInterval(update, 20);
}

$pong.mousemove(function (evt) {
  if (!interval) {
    return;
  }
  const top = Math.min(
    $pong.height() - $playerPadel.height(),
    evt.pageY - $pong.offset().top
  )
  $playerPadel.css({
    top: `${top}px`
  });
});

function update() {
  updateBall();
  updateAiPadel();
}

function updateBall () {
  ball.top += ball.speed * Math.sin(ball.angle);
  ball.left += ball.speed * Math.cos(ball.angle);
  $ball.css({
    top: `${ball.top}px`,
    left: `${ball.left}px`
  });

  if (isBallOverlappingWithPlayerPadel()) {
    if (ball.angle === UP_LEFT) {
      ball.angle = UP_RIGHT;
    } else {
      ball.angle = DOWN_RIGHT;
    }
  }

  if (isBallOverlappingWithAiPadel()) {
    if (ball.angle === UP_RIGHT) {
      ball.angle = UP_LEFT;
    } else {
      ball.angle = DOWN_LEFT;
    }
  }

  if (isBallOverlappingWithTop()) {
    if (ball.angle === UP_RIGHT) {
      ball.angle = DOWN_RIGHT;
    } else {
      ball.angle = DOWN_LEFT;
    }
  }

  if (isBallOverlappingWithBottom()) {
    if (ball.angle === DOWN_RIGHT) {
      ball.angle = UP_RIGHT;
    } else {
      ball.angle = UP_LEFT;
    }
  }

  const winner = getWinner();
  if (winner) {
    endGame(winner);
  }
}

function endGame(winner) {
  clearInterval(interval);
  interval = null;
  alert(`${winner} has won the game!`);
}

function isBallOverlappingWithPlayerPadel () {
  return $ball.overlaps('#player-padel').length > 0
}

function isBallOverlappingWithAiPadel () {
  return $ball.overlaps('#ai-padel').length > 0
}

function isBallOverlappingWithTop () {
  return ball.top <= 0;
}

function isBallOverlappingWithBottom () {
  return ball.top >= $pong.height() - $ball.height();
}

function updateAiPadel () {
  if (aiPadel.top > $pong.height() - $aiPadel.height()) {
    aiPadel.direction = -1;
  }

  if (aiPadel.top < 0) {
    aiPadel.direction = 1;
  }

  aiPadel.top += aiPadel.direction * aiPadel.SPEED;
  
  $aiPadel.css({
    top: `${aiPadel.top}px`
  });
}

function getWinner () {
  if (ball.left < 0){
    return 'red';
  } else if (ball.left > $pong.width() - $ball.width()) {
    return 'blue';
  } else {
    return false;
  }
}

init();