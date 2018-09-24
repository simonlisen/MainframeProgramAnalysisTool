//clear the canvas
function clearChart() {
    $('#chart-container').empty();
}

//nav bar button listeners

$(document).on('click', '#clearChart', function () {
    event.stopPropagation();
    event.preventDefault();   
    clearChart();
});

$(document).on('click', '#submit-build-new', function () {
    event.stopPropagation();
    event.preventDefault();    
    $('#myModal').modal('hide')
    clearChart();  

    var datasource = {
        
    };

    $.ajax({
        url: "/Build/GetDataByFileName?filename=seba000",
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var jsonResult = JSON.parse(result);
            $('#chart-container').orgchart({
                'data': jsonResult,
                'nodeContent': 'title',//'title'
                'direction': 'l2r'
            });
        }        
    });
    

});

