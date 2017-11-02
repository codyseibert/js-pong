const $pong = $('#pong');
const $playerPadel = $('#player-padel');

$pong.mousemove(function (evt) {
  const top = Math.min(
    $pong.height() - $playerPadel.height(),
    evt.pageY - $pong.offset().top
  )
  $playerPadel.css({
    top: `${top}px`
  });
});