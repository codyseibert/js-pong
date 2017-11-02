const $pong = $('#pong');
const $playerPadel = $('#player-padel');
const $aiPadel = $('#ai-padel');

const aiPadel = {
  direction: 1,
  SPEED: 3,
  top: 0
}

$pong.mousemove(function (evt) {
  const top = Math.min(
    $pong.height() - $playerPadel.height(),
    evt.pageY - $pong.offset().top
  )
  $playerPadel.css({
    top: `${top}px`
  });
});

function update() {
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

setInterval(update, 20);