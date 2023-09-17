Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

$(async function() {
  Parse.initialize("1nhjTQBn9OYYtuz4NRICNutfUnZpO60cDecoJ6AM", "0TspXLQiu8SZAts1apWKS4kcIytg6tfRfKc2HUbu"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = "https://parseapi.back4app.com/";
  
  // const results = await query.find();
  // const { tIn, tOut, hIn, hOut } = results[1].attributes;
  
  
  const dataHeader = "<tr><th>Time</th><th>Temp. inside</th><th>Temp. outside</th><th>Humi. inside</th><th>Humi. outside</th></tr>";
  
  var currentValuesTable = document.getElementById("currentValuesTable");  
  var resultsTable = document.getElementById("resultsTable");  
  var resultHeader = document.getElementById("resultHeader");
  var yearSelect = document.getElementById("yearSelect");
  var monthSelect = document.getElementById("monthSelect");
  var daySelect = document.getElementById("daySelect");
  var useCustomDateCheckbox = document.getElementById("useCustomDate");
  var customDateBox = document.getElementById("customDateBox");

  var today = new Date();

  const urlParams = new URLSearchParams(window.location.search);

  var useCustomDate = urlParams.get('useCustomDate') == 'on';
  if (useCustomDate)
  {
    useCustomDateCheckbox.checked = true;
    customDateBox.style.visibility = "visible";
  }
  var selDay = parseInt(urlParams.get('day'));
  if (!useCustomDate || urlParams.get('day') == null)
  {
    selDay = today.getUTCDate();
  }
  var selMonth = parseInt(urlParams.get('month'));
  if (!useCustomDate || urlParams.get('month') == null)
  {
    selMonth = today.getUTCMonth()+1;
  }
  var selYear = parseInt(urlParams.get('year'));
  if (!useCustomDate || urlParams.get('year') == null)
  {
    selYear = today.getUTCFullYear();
  }

  
  // var thisYear = today.getUTCFullYear();  
  daySelect.value = selDay;
  monthSelect.value = selMonth;
  yearSelect.value = selYear;
  
  // var selYear = yearSelect.options[yearSelect.selectedIndex].text;
  // var selMonth = monthSelect.options[monthSelect.selectedIndex].text;
  // var selDay = daySelect.options[daySelect.selectedIndex].text;
    
  const elmevejObject = Parse.Object.extend("elmevej");
  const query = new Parse.Query(elmevejObject);
  //query.limit(25);
  var lim = new Date(selYear+"-"+selMonth+"-"+selDay);//T09:00:00.000+02:00");
  var lim2 = lim.addDays(1);

  query.greaterThan("createdAt", lim);
  query.lessThan("createdAt", lim2);
  query.descending("createdAt");
  
  const results = await query.find();
  
  resultHeader.innerHTML = 'All results for ' + selDay  + '/' + selMonth + '/' + selYear;
  var entries = "";
  var oneEntry = "";
  var first = true;
  
  results.forEach((result) => {
    const { tIn, tOut, hIn, hOut, createdAt } = result.attributes;
  
    var date = new Date(createdAt);
    
    var localDate = date.toString();
  
    var localHours = date.getHours();    
    localHours = localHours < 10 ? '0'+localHours : ''+localHours;
    var localMinutes = date.getMinutes();
    localMinutes = localMinutes < 10 ? '0'+localMinutes : ''+localMinutes;
    var localSeconds = date.getSeconds();
    localSeconds = localSeconds < 10 ? '0'+localSeconds : ''+localSeconds;
  
    oneEntry = '<tr><td><b>'+localHours+':'+localMinutes+':'+localSeconds+'</b></td>';
    oneEntry += '<td>'+tIn+'</td>';
    oneEntry += '<td>'+tOut+'</td>';
    oneEntry += '<td>'+hIn+'</td>';
    oneEntry += '<td>'+hOut+'</td></tr>';
    entries = oneEntry + entries;
  
    if (first) {
      currentValuesTable.innerHTML = dataHeader + oneEntry;
      first = false;
    }
  });
  
  resultsTable.innerHTML = dataHeader + entries;
  
  $('#daySelect').on('change', function() {
    window.location.href = "index.html?day="+this.value+"&month="+selMonth+"&year="+selYear+"&useCustomDate="+(useCustomDate ? 'on' : '');
  });
  $('#monthSelect').on('change', function() {
    window.location.href = "index.html?day="+selDay+"&month="+this.value+"&year="+selYear+"&useCustomDate="+(useCustomDate ? 'on' : '');
  });
  $('#yearSelect').on('change', function() {
    window.location.href = "index.html?day="+selDay+"&month="+selMonth+"&year="+this.value+"&useCustomDate="+(useCustomDate ? 'on' : '');
  });
  $('#useCustomDate').on('change', function() {
    useCustomDate = !useCustomDate;
    window.location.href = "index.html?useCustomDate="+(useCustomDate ? 'on' : '');
  });
  
  // query.get("fyKfhUEvdb").then((result) => {
  //   // The object was retrieved successfully.
  //   alert(JSON.stringify(result));
  //   // const { tIn, tOut, hIn, hOut } = result.attributes;
  //   // alert(tIn);
  // }, (error) => { 
  //   // The object was not retrieved successfully.
  //   // error is a Parse.Error with an error code and message.
  // });
  
});



