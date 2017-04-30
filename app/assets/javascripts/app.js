$(document).ready(function() {
  $("#pref").on('click', '#matched-users',function(event) {
    event.preventDefault();
    hideLinks();
    loadUsers();
  });



  $("#gyms-link").on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    /*call function that appends all the gyms like users does*/
  });
  $("#new-pref").on("click", function(e) {
    e.preventDefault();
    hideLinks();
    $.ajax({url:"/preferences/new", method: "GET"}).done(function(response) {
      $("#pref").html(response.newPrefForm);
    })
  });

  $("#update-pref").on("click", function(e) {
    e.preventDefault();
    var action = $(this).attr("href");
    hideLinks();
    $.ajax({url:action, method: "GET"}).done(function(response) {
      $("#pref").html(response.editPrefForm);
    })
  })


});

function hideLinks(){
  $('#gyms-link').hide();
  $('#new-pref').hide();
  $('#update-pref').hide();
  $('#matched-users').hide();
}

function loadUsers() {
  var promise = getUsers();
  promise.done(renderUsers);
}

function getUsers() {
   var requestPromise = $.ajax({url:"/users", method: "GET"});
  return requestPromise;
}


function renderUsers(response) {
  var all_users = "";
  response.forEach(function(user) {
    all_users += generateOneUser(user);
  });
  $("#users-pylon").append(all_users);
}

function generateOneUser(user){
  return `<li class="user">
          <div class="user-content">
            <p>
              <span class = "name">
              <a href="place url for specific user profile page" >${user.first_name} ${user.last_name}</a>  </span>
              <span class= "age"> ${user.age}</span>
              <span class= "gender"> ${user.gender_pronoun}</span>
            </p>
          </div>
        </li>`;
}

