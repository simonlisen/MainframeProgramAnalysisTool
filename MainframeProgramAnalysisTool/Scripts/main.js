//clear the canvas
function clearChart() {
    $('#chart-container').empty();
}

//template of the node
var nodeTemplate = function (data) {
   // data.tile.split('-')
    if (data.title.charAt(0) == '1') {
        return `
        <div class="node-outer">
        <div class="title">${data.name}<div class="info-btn btn btn-xs btn-success" data-toggle="modal" data-target="#exampleModal" data-name="${data.name}" data-details="${data.title}">i</div></div>
        <div class="content">${data.title} </div>
      `;
    } else {
        return `
        <div class="node-outer">
        <div class="title">${data.name}<div class="info-btn btn btn-xs btn-default" data-toggle="modal" data-target="#exampleModal" data-name="${data.name}" data-details="${data.title}">i</div></div>
        <div class="content">${data.title} </div>
      `;
    }   
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
                'nodeTemplate': nodeTemplate
               
            });
        }        
    });
    

});

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var nodeName = button.data('name') // Extract info from data-* attributes
    var details = button.data('details')
    var modal = $(this)
    // Flag $ Rate $ Procs $ Jcls $ Desc
    var detailFields = details.split('$')
    if (detailFields.length != 5) {
        //return error
    }
    var flag = detailFields[0];
    var rate = detailFields[1];
    var procs = detailFields[2];
    var jcls = detailFields[3];
    var desc = detailFields[4];

    modal.find('.modal-title').text('Details of ' + nodeName + 'flag: ' + flag)
    modal.find('.modal-body #details-rate').val(rate)
    modal.find('.modal-body #details-procs').val(procs)
    modal.find('.modal-body #details-jcls').val(jcls)
    modal.find('.modal-body #details-desc').val(desc)
})

