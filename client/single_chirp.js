var path = window.location.pathname; //Shows the link path of each chirp in database.
var pieces = path.split('/'); //This will split the url into seperate directories.
var id = pieces[2]; 

//Use Ajax to receive information from the SQL database.

$.ajax({
    method: 'GET',
    url: '/api/Allchirps/' + id
}).then(function (chirp) {
    addChirpDiv(chirp);
}, function (error) {
    console.log(error);
});

function addChirpDiv(chirp) {
    var $chirpDiv = $('<div class="chirp"></div>');
    var $message = $('<p></p>');
    var $user = $('<h4></h4>');
    var $timestamp = $('<h5></h5>');
    var $buttonBlock = $('<div class="button-block"></div>');
    var $updateButton = $('<button type="button" id="update-button" class="btn-warning btn-md">Update <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>');
    $updateButton.click(function () {
        window.location.pathname = '/Allchirps/' + id + '/update';
    });
    var $delButton = $('<button class="delete-button btn-danger btn-md">Delete <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>');
    $delButton.click(function () {
        if (confirm('Are you sure you want to delete this chirp?')) {
            $.ajax({
                method: 'DELETE',
                url: '/api/Allchirps/' + id
            }).then(function () {
                window.location.replace('/Allchirps');
            }, function (error) {
                console.log(error);
            });
        }
    });

    $message.text(chirp.message);
    $user.text(chirp.username);
    $timestamp.text(new Date(chirp.timestamp).toLocaleString());

    $buttonBlock.append($updateButton);
    $buttonBlock.append($delButton);

    $message.appendTo($chirpDiv);
    $user.appendTo($chirpDiv);
    $timestamp.appendTo($chirpDiv);
    $buttonBlock.appendTo($chirpDiv);

    $chirpDiv.appendTo('#chirp-list');
}