function playSound() {
  const audio = new Audio("./assets/smash.mp3");
  audio.play();
}

$(window).on("mousemove", function (e) {
  // have the hammer follow the cursor
  // use "e.originalEvent.offsetX" and "e.originalEvent.offsetY" for mouse position
  // using this alone will put the element on the bottom right so u might need to + 100 or - 100
  const hammer = $(".hammer");
  hammer.css("left", e.pageX - 20);
  hammer.css("top", e.pageY + 15);
});

$(window).on("click", function (e) {
  // rotate the hammer and hit the mole
  // using setTimeout, rotate it back 100ms later
  const hammer = $(".hammer");
  hammer.css("transform", "rotate(-45deg)");
  setTimeout(() => {
    hammer.css("transform", "rotate(0deg)");
  }, 100);
});

$(".hole").on("click", function (e) {
  const mole = $(this).find(".mole");
  const moleHit = $(this).find(".mole-hit");

  // Do nothing if no mole or already hit

  if (!mole.is(":visible")) return;
  console.log("mole is hit");

  playSound();
  mole.hide();
  moleHit.show();

  setTimeout(() => {
    moleHit.hide();
  }, 500);
});

// add a function that every second randomly shows a mole from the list of moles

function showRandomMole() {
  const holes = $(".hole");
  const randomIndex = Math.floor(Math.random() * holes.length);
  const moleHit = holes.eq(randomIndex).find(".mole-hit");
  const mole = holes.eq(randomIndex).find(".mole");
  if (mole.is(":visible") || moleHit.is(":visible")) return;
  mole.show();
  setTimeout(() => {
    mole.hide();
  }, 800);
}

setInterval(showRandomMole, 1000);
