var path = window.location.pathname;
var pieces = path.split('/');
var id = pieces[2];

$.ajax({
    method: 'GET',
    url: '/api/Allchirps/' + id
}).then(function (chirp) {
    $('#chirp-message').val(chirp.message);
}, function (error) {
    console.log(error);
});

$('#update-button').click(function () {
    var payload = {
        message: $('#chirp-message').val()
    };
    $.ajax({
        method: 'PUT',
        url: '/api/Allchirps/' + id,
        contentType: 'application/json',
        data: JSON.stringify(payload)
    }).then(function () {
        window.history.back();
    }, function (error) {
        console.log(error);
    });
});