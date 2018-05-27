//Run our jQuery
$(document).ready(function() {
  //Array to store FCC followers
  // var following = [];
 
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp",
    headers:{
      'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
    },
    success: function(data1){
       debugger;
       if (data1.stream === null) {
      //FCC Offline
      $("#fccStatus").html("Free Code Camp is currently OFFLINE");
    } else {
      //FCC Online
      $("#fccStatus").html("Free Code Camp is currently LIVE");
    }
    }
  });
  
    $.ajax({
    type: "GET",
  
    url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
    headers:{
      'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
    },
    success: function(data2){
  for (var i = 0; i < data2.follows.length; i++) {
    console.log(data2.follows[0]);
      //gets displayName
      var displayName = data2.follows[i].channel.display_name;
      var logo = data2.follows[i].channel.logo;
    var status= data2.follows[i].channel.status;
    if(logo==null){
      logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
    }
     $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a href='https://www.twitch.tv/"+ displayName+"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
    }    
    }    
  });
  var deletedFollowers=['brunofin', 'comster404'];
  for(var i=0;i<deletedFollowers.length;i++){
     $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/"+deletedFollowers[i],
    headers:{
      'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
    },
     error: function(data3){
       var logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
       var displayName= data3.statusText;
       var status= data3.status;
         $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a  href='https://www.twitch.tv/" +displayName+  +"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
     }
  });
  
  }
  
});