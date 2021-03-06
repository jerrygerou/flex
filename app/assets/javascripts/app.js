$(document).ready(function() {
  // AJAX call to get rid of Devise flash message
  $('body').click(function(){
    $("div#flash_notice").hide();
  });


  // AJAX call to new preference call; works on home page and user profile page
  $("div.container").on("click", "#new-pref", function(event) {
    event.preventDefault();
    $.ajax({url:"/preferences/new", method: "GET"}).done(function(response) {
      $(".container").html(response.newPrefForm);
    })
  });

// AJAX call to edit preference call; works on home page and user profile page
  $("body").on("click", "#update-pref", function(e) {
    e.preventDefault();
    var action = $(this).attr("href");
    $.ajax({url:action, method: "GET"}).done(function(response) {
      $(".container").html(response.editPrefForm);
    })
  });

// AJAX call to append pic upload form on user profile page
  $("body").on("click", "#pic-upload", function(event) {
    event.preventDefault();
    var $picUploadLink = $(this);
    var action = $picUploadLink.attr("href");
    $.ajax({url: action, method: "GET"}).done(function(response) {
      $(".container").html(response.picUpload);
    });
  });

// AJAX call to submit photo on user profile page. Makes the call to update attributes for user, waits for a second, and then makes an AJAX call to bring in updated user profile page
  // $("body").on("submit", "form.edit_user", function(event) {
  //   var $picForm = $(this);
  //   debugger
  //   action = $picForm.closest("body").find("a.user-page").attr("href");
  //   setTimeout(userProfile, 1000);
  // });


// AJAX call to show list of gyms specific to the user, and adds "Add New Gym" link at the end of the list
  $(".container").on('click', "#gyms-link", function(event) {
    event.preventDefault();
    hideLinks();
    $.ajax({url:"/gyms", method: "GET"}).done(function(response) {
      $(".container").html(response.gymsInfo);
    });
  });

// Displays form to add new gym, on new page
  $(".container").on("click", "#new-gym", function(event) {
    event.preventDefault();
    var action = $(this).attr("href");
    $.ajax({url: action, method: "GET"}).done(function(response) {
      $(".container").html(response)
    })
  });

// AJAX call to submit new gym
  $(".container").on("submit", "#gym-submit", function(event) {
    event.preventDefault();
    var $gymSubmitButton = $(this);
    var table = $gymSubmitButton.closest("div#gym-form").find("table");
    var name = table.find("#name").val();
    var streetAddress = table.find("#street_number").val() + " " + table.find("#route").val();
    var city = table.find("#locality").val();
    var state = table.find("#administrative_area_level_1").val();
    var zip = table.find("#postal_code").val();
    var data = {gym: {name: name, street_address: streetAddress, city: city, state: state, zip: zip}};
    $.ajax({url: "/gyms",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: "POST",
      data: data}).done(function(response){
        $(".container").html(response.gymsInfo);
      })
  });

// AJAX set primary gym
  $("body").on('click', '.set-primary', function(event) {
    event.preventDefault();
    var id = $(this).find("a")[0].id;
    $.ajax({url: "/gyms/"+id+ "/set_primary",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: "PATCH"}).done(function(response) {
      $(".container").html(response.gymsInfo);
    })
  })


// AJAX call to hide all links on home page and display list of matched users
  $("body").on('click', '#matched-users',function(event) {
    event.preventDefault();
    hideLinks();
    loadUsers();
  });

// AJAX call to display user profile
  $("body").on('click', ".user-page", function(event) {
    event.preventDefault();
    var action = $(this).attr("href");
    $.ajax({url: action, method: "GET"}).done(function(response) {
      $(".container").html(response.userInfo);
    })
  });

// AJAX call to update user preferences; works on home and user profile page; redirects back to user profile
  $("body").on("submit", ".edit_preference", function(event) {
    event.preventDefault();
    var action = $(this).attr("action");
    var data = $(this).serialize();
    $.ajax({url: action, method: "PATCH", data: data}).done(function(response) {
      $(".container").html(response.userInfo);
    })
  });

// AJAX call to create new user preferences; works on home and user profile page; redirects back to user profile
  $("body").on("submit", ".new_preference", function(event) {
    event.preventDefault();
    var action = $(this).attr("action");
    var data = $(this).serialize();
    $.ajax({url: action, method: "POST", data: data}).done(function(response) {
      $(".container").html(response.userInfo);
    })
  });


  $("body").on("click", "a#add", function(event) {
    event.preventDefault();
    var $addFriend = $(this);
    var action = $addFriend.attr("href");
    $.ajax({url: action,
            method: "POST",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            })
      .done(function(response) {
      $(".friend").html(response.friendInfo)
    });
  });

  $('body').on('click', 'a#cancel', function(event) {
    event.preventDefault();
    var $deleteFriendRequest = $(this);
    var action = $deleteFriendRequest.attr("href");
    $.ajax({url: action,
            method: "DELETE",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            })
      .done(function(response) {
      $(".friend").html(response.friendInfo)
    });
  });

  $('body').on('click', 'a#accept', function(event) {
    event.preventDefault();
    var $acceptRequest = $(this);
    var action = $acceptRequest.attr("href");
    $.ajax({url: action,
            method: "POST",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            })
      .done(function(response) {
      $(".friend").html(response.friendInfo)
    });
  })


  $('body').on('click', 'a#unfriend', function(event) {
    event.preventDefault();
    var $unfriend = $(this);
    var action = $unfriend.attr("href");
    $.ajax({url: action,
            method: "DELETE",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            })
      .done(function(response) {
      $(".friend").html(response.friendInfo)
    });
  });

  $('body').on('click', 'a#deny', function(event) {
    event.preventDefault();
    var $denyRequest = $(this);
    var action = $denyRequest.attr("href");
    $.ajax({url: action,
            method: "DELETE",
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            })
      .done(function(response) {
      $(".friend").html(response.friendInfo)
    });
  });

})


