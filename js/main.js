$(document).ready(function() {
    myAudio = new Audio('./sound.mp3');
    // process bar
    console.log(CONFIG);
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: CONFIG.lookMeLink,
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("' + CONFIG.iputBgLink + '")',
        imageAlt: 'Custom image',
        //icon: "info",
        confirmButtonText: CONFIG.btnIntro
    }).then(function() {
        if (typeof myAudio.loop == 'boolean') {
            myAudio.loop = true;
        } else {
            myAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        myAudio.play();
        $('.content').show(200);
    })
}

// switch button position
function switchButton() {
    var audio = new Audio(CONFIG.duckLink);
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var topY = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}
// move random button póition
function moveButton() {
    var audio = new Audio(CONFIG.swishLink);
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
        n++
        if(n<20 || n>60){
            switchButton();
        }
        if(n>60) n=0;
        $('#no').tooltip();
        console.log(n);
});
$('#no').click(() => {
    if (screen.width >= 900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function() {
    var audio = new Audio(CONFIG.duckLink);
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("' + CONFIG.iputBgLink + '")',
        backdrop: `
              rgba(0,0,123,0.4)
              
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("' + CONFIG.iputBgLink + '")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})