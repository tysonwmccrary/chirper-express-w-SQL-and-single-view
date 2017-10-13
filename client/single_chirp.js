var path = window.location.pathname; // /chirps/12
var pieces = path.split('/'); //This will split the url into seperate directories.
var id = pieces[2]; // 12

//Use Ajax to receive information from the SQL database.

$.ajax({
    method: 'GET',
    url: '/api/Allchirps/' + id
}).then(function (chirp) {
    addChirpDiv(chirp);
}, function (err) {
    console.log(err);
});

function addChirpDiv(chirp) {
    var $chirpDiv = $('<div class="chirp"></div>');
    var $message = $('<p></p>');
    var $user = $('<h4></h4>');
    var $timestamp = $('<h5></h5>');
    var $buttonBlock = $('<div class="button-block"></div>');
    var $editButton = $('<button class="fancy-button">Update</button>');
    $editButton.click(function () {
        window.location.pathname = '/Allchirps/' + id + '/update';
    });
    var $delButton = $('<button class="delete-button btn-danger btn-sm">Delete <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>');
    $delButton.click(function () {
        if (confirm('Are you sure you want to delete this chirp?')) {
            $.ajax({
                method: 'DELETE',
                url: '/api/Allchirps/' + id
            }).then(function () {
                window.location.replace('/Allchirps');
            }, function (err) {
                console.log(err);
            });
        }
    });

    $message.text(chirp.message);
    $user.text(chirp.userName);
    $timestamp.text(new Date(chirp.timestamp).toLocaleString());

    $buttonBlock.append($editButton);
    $buttonBlock.append($delButton);

    $message.appendTo($chirpDiv);
    $user.appendTo($chirpDiv);
    $timestamp.appendTo($chirpDiv);
    $buttonBlock.appendTo($chirpDiv);

    $chirpDiv.appendTo('#chirp-list');
}