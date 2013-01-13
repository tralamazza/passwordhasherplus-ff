$('input[type="password"]').focusin(function () {
  console.log('focus in a password field');
}).focusout(function () {
  console.log('focus out of a password field');
});

$('input[type="password"]').hover(function () {
  console.log('hover in a password field');
}, function () {
  console.log('hover out of a password field');
});