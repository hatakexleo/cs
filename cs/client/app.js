function showInformation() {
  document.getElementById('infoBox').style.display = 'block';
}

function closeInformation() {
  document.getElementById('infoBox').style.display = 'none';
}

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getSeasonValue() {
    var uiBHK = document.getElementsByName("uiBHK1");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  
  function onClickedEstimatePrice()
  {
    console.log("Estimate crop sucess button clicked");
    var rainfall = document.getElementById("uiSqft");
    var crop = getBHKValue();
    var soil_type = getSeasonValue();
    var season=getBathValue();
    var pesticide = document.getElementById("uiLocations");
    var estSucessRate = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_crop_sucess"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        rainfall: parseFloat(rainfall.value),
        crop: crop,
        soil_type: soil_type,
        season:season,
        pesticide: pesticide.value
    },function(data, status) {
        console.log(data.estimated_price);
        estSucessRate.innerHTML = "<h2>" + data.crop_success.toString() + " %</h2>";
        console.log(status);
    });
  }
  
function onPageLoad() {
console.log( "document loaded" );
var url = "http://127.0.0.1:5000/get_pesticides_names"; // Use this if you are NOT using nginx which is first 7 tutorials
// var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
$.get(url,function(data, status) {
    console.log("got response for get_pesticide_names request");
    console.log(data)
    var pesticides = data.pesticide;
    var uiLocations = document.getElementById("uiLocations");
    $('#uiLocations').empty();
    for(var i in pesticides) {
        var opt = new Option(pesticides[i]);
        $('#uiLocations').append(opt);
    }
    
});
}

window.onload = onPageLoad; 