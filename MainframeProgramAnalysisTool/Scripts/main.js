var oc = {};

//clear the canvas
function clearChart() {
    $('#chart-container').empty();
}

//template of the node
var nodeTemplate = function (data) {
   // data.tile.split('-')
    if (data.title.charAt(0) == 'Y') {
        return `
        <div class="node-outer">
        <div class="title">${data.name}<div class="info-btn btn btn-xs btn-success float-right" data-toggle="modal" data-target="#detailModal" data-name="${data.name}" data-details="${data.title}" data-flag="Y">i</div></div>
        <div class="content">${data.title} </div>
      `;
    } else {
        return `
        <div class="node-outer">
        <div class="title">${data.name}<div class="info-btn btn btn-xs btn-default float-right" data-toggle="modal" data-target="#detailModal" data-name="${data.name}" data-details="${data.title}" data-flag="N">i</div></div>
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

//build successor
$(document).on('click', '#submit-build-successor', function () {
    event.stopPropagation();
    event.preventDefault();    
    $('.modal-build').modal('hide')
    clearChart();  
    var filename = $('#ipt-build-successor').val().trim();

    $.ajax({
       // url: "/Build/GetDataByFileName?filename=" + filename,
        url: "./Generated/" + filename + ".txt",
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            //var jsonResult = JSON.parse(result);
            var jsonResult = result;
            var chart = $('#chart-container');
            chart.css('text-align', 'left');
            if (chart.attr('data-loaded') == 'false') {
                oc = $('#chart-container').orgchart({
                    'data': jsonResult,
                    'nodeContent': 'title',//'title'
                    'direction': 'l2r',
                    'nodeTemplate': nodeTemplate,
                    'pan': true,
                    'zoom': true
                });
                chart.attr('data-loaded', 'true');
            } else {
                oc.init({
                    'data': jsonResult,
                    'nodeContent': 'title',//'title'
                    'direction': 'l2r',
                    'nodeTemplate': nodeTemplate,
                    'pan': true,
                    'zoom': true                   
                });
            }                       
            $('.orgchart').addClass('noncollapsable');           
        }        
    });
    

});

//build predecessor
$(document).on('click', '#submit-build-predecessor', function () {
    event.stopPropagation();
    event.preventDefault();
    $('.modal-build').modal('hide')
    clearChart();

    var filename = $('#ipt-build-predecessor').val().trim(); 

    $.ajax({
        // url: "/Build/GetDataByFileName?filename=" + filename,
        url: "./Generated/" + filename + ".txt",
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            //var jsonResult = JSON.parse(result);
            var jsonResult = result;
            var chart = $('#chart-container');
            chart.css('text-align', 'right');
            if (chart.attr('data-loaded') == 'false') {
                oc = $('#chart-container').orgchart({
                    'data': jsonResult,
                    'nodeContent': 'title',//'title'
                    'direction': 'r2l',
                    'nodeTemplate': nodeTemplate,
                    'pan': true,
                    'zoom': true
                });
                chart.attr('data-loaded', 'true');
            } else {
                oc.init({
                    'data': jsonResult,
                    'nodeContent': 'title',//'title'
                    'direction': 'r2l',
                    'nodeTemplate': nodeTemplate,
                    'pan': true,
                    'zoom': true
                });
            }
            $('.orgchart').addClass('noncollapsable');
        }
    });


});

//locate node
$(document).on('click', '#submit-locate-node', function () {
    event.stopPropagation();
    event.preventDefault();    
    $('.orgchart .node .title').css('background-color', 'rgba(42, 100, 150, 0.8)');
    var nodeName = $('#ipt-locate-node').val().trim();
    var target = $('[data-name="' + nodeName + '"]');
    if (target.length >= 1) {
        $("#chart-container").scrollTo(target, 250, { offset: { top: "-50px", left: "-100px" } });
        //$("#chart-container").scrollTo(target, 250, { offset: -50 });
        target.closest('.title').css('background-color','rgba(255, 0, 0, 0.8)');
        $('.modal-build').modal('hide');
    } else {
        $('#locate-comment').html("Node not found.");
    }   
    
});

$('#detailModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var nodeName = button.data('name') // Extract info from data-* attributes
    var details = button.data('details')
    var flagdata = button.data('flag')
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

    var str = "*This program has successor, and it's already drawed in first display."
    if (flagdata == 'Y') {
        modal.find('.modal-body #details-comment').html(str);
    } else{
        modal.find('.modal-body #details-comment').html('');
    }    
})

