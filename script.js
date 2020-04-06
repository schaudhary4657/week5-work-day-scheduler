$(document).ready(function() {
    // displays time from the moment on the page
    var date = moment().format("dddd MMMM DD YYYY");
    var dateHour24 = moment().format("H");
    var dateHour12 = moment().format("h");

    var $displayDate = $("#currentDay")
    $displayDate.text(date);

    var saveIcon = "https://fontawesome.com/icons/save?style=regular";

    // getting stored data from local storage and update the array with retrieved data
    var storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));

    if (storedSchedule !== null) {
        textarea = storedSchedule;
    }
    else {
        textarea = new Array(9);
        textarea[2] = "Event that already happened";
        textarea[3] = "Current Hour";
    }
    
    // building scheduler with fix set of hours
    var $scheduleDiv = $("#daily-schedule");
    $scheduleDiv.empty();

    for (var hour = 9; hour <= 17; hour++) {
        var index = hour - 9;
        
        // building rows
        var $rowDiv = $("<div>");
        $rowDiv.addClass("row");
        $rowDiv.addClass("schedulerRow");
        $rowDiv.attr("hour-index", hour);
      
        var $column2TimeDiv = $("<div>");
        $column2TimeDiv.addClass("col-md-2");
      
        // creating element that contains time
        var $timeBlockSpan = $("<span>");
        $timeBlockSpan.attr("class", "time-block");
        
        // formatting hours to display
        var displayHour = 0;
        var ampm = "";
        if (hour > 12) {
          displayHour = hour - 12;
          ampm = "pm";
        }
        else {
          displayHour = hour;
          ampm = "am";
        }
        
        // display timeBlock with time
        $timeBlockSpan.text(`${displayHour} ${ampm}`);
    
        $rowDiv.append($column2TimeDiv);
        $column2TimeDiv.append($timeBlockSpan);
    
        // building row components
        var $dailyScheduleSpan = $("<input>");
    
        $dailyScheduleSpan.attr("id",`input-${index}`);
        $dailyScheduleSpan.attr("hour-index", index);
        $dailyScheduleSpan.attr("type", "text");
        $dailyScheduleSpan.attr("class", "dailySchedule");
        $dailyScheduleSpan.val(textarea[index]);
        
        // creating column width and adding it and row component to row
        var $column9InputDiv = $("<div>");
        $column9InputDiv.addClass("col-md-9");
        
        $rowDiv.append($column9InputDiv);
        $column9InputDiv.append($dailyScheduleSpan);
    
        // building save portion of row
        var $column1SaveDiv = $("<div>");
        $column1SaveDiv.addClass("col-md-1");
    
        var $saveBtn = $("<i>");
        $saveBtn.attr("id", `saveid-${index}`);
        $saveBtn.attr("save-id", index);
        $saveBtn.attr("class", "far fa-save saveIcon");
        
        // adding column width and row component to row
        $rowDiv.append($column1SaveDiv);
        $column1SaveDiv.append($saveBtn);
    
        // setting row color based on time
        updateRowColor($rowDiv, hour);
        
        // adding row to scheduler container
        $scheduleDiv.append($rowDiv);
    };

    // function to update color of time block row
    function updateRowColor ($hourRow, hour) {

        if (hour < dateHour24) {
            $hourRow.addClass("pastDiv");
        }
        else if ( hour > dateHour24) {
            $hourRow.addClass("futureDiv");
        }
        else {
            $hourRow.addClass("presentDiv");
        }
    };

    // editing on schedule area and saves the data to local storage
    $(document).on("click", "i", function(event) {
        event.preventDefault();

        var $index = $(this).attr("save-id");

        var inputId = "#input-" + $index;
        var $value = $(inputId).val();

        textarea[$index] = $value;

        $(`#saveid-${$index}`).removeClass("shadowPulse");
        localStorage.setItem("storedSchedule", JSON.stringify(textarea));
    });

    // function save button on change of input, check save button and add shadow pulse class
    $(document).on("change", "input", function(event) {
        event.preventDefault();

        var i = $(this).attr("hour-index");

        $(`#saveid-${i}`).addClass("shadowPulse");
    });
});
