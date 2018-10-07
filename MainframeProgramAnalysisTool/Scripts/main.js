//clear the canvas
function clearChart() {
    $('#chart-container').empty();
}

//template of the node
var nodeTemplate = function (data) {
   // data.tile.split('-')
    return `
        <div class="node-outer" data-toggle="tooltip" data-placement="bottom" data-html="true" title="${data.name} is a good guy./br asdasdasdasdssdfgds<h3>ahahahha</h3>">
        <div class="title">${data.name}</div>
        <div class="content">${data.title} </div>
      `;
};


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

    var filename = $('#ipt_buildnew').val().trim();

    $.ajax({
        url: "/Build/GetDataByFileName?filename=" + filename,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var jsonResult = JSON.parse(result);
            $('#chart-container').orgchart({
                'data': jsonResult,
                'nodeContent': 'title',//'title'
                'direction': 'l2r',
                'nodeTemplate': nodeTemplate,
                'initCompleted': function () {
                    $('[data-toggle="tooltip"]').tooltip();
                }
            });
        }        
    });
    

});

