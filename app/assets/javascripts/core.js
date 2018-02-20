function notify(from, align, icon, type, message){

 $.notify({
  icon: icon,
  title: 'Notice:  ',
  message: message,
  url: ''
 },{
  element: 'body',
  type: type,
  allow_dismiss: false,
  placement: {
   from: from,
   align: align
  },
  offset: {
   x: 20,
   y: 20
  },
  spacing: 10,
  z_index: 1031,
  delay: 1500,
  timer: 3000,
  url_target: '_blank',
  mouse_over: false,
  animate: {
   enter: 'animated fadeInRight',
   exit: 'animated fadeOutRight'
  },
  template:   '<div data-notify="container" class="alert alert-{0} alert--notify" role="alert">' +
  '<span data-notify="icon"></span> ' +
  '<span data-notify="title">{1}</span> ' +
  '<span data-notify="message">{2}</span>' +
  '<div class="progress" data-notify="progressbar">' +
  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  '</div>' +
  '<a href="{3}" target="{4}" data-notify="url"></a>' +
  '<button type="button" aria-hidden="true" data-notify="dismiss" class="alert--notify__close">Close</button>' +
  '</div>'
 });
}

/*
  Grid Toggler
*/

// Register a handler to the toggle event of grid toggles
function registerGridToggle(name) {
  $(name + ' .toggle-switch > input.grid-toggle').on('click', function() {
    notify("Toggle successfully updated", "inverse");
  })
};

function gridToDateTime(value) {
  var result = moment(value).format("llll");
  if (value === null) {
    result = "";
  }
  return result;
}


function gridToYesNo(value) {
  var result = "Yes";
  if (value === '0' || value === false) {
    result = 'No';
  }
  return result;
}

function gridToAvatar(value) {
  return "<img class='avatar-sm' src='" + value + "' />";
}
