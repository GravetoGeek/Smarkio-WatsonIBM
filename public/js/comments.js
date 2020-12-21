/************
 ** CONFIG **
 ************/
const urlBase = document.URL;
/**
 * Send default
 */
function send() {
    event.preventDefault();
    const comment = document.getElementById("comment").value
    const button = document.getElementById("button")
    button.disabled = true;
    var http = new XMLHttpRequest()
    let statusCode = null;
    http.onload = function () {
        statusSend(this.status)
        statusCode = this.status
        get()
    }
    http.open("POST", urlBase + "comments", true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify({ text: comment }));
    setTimeout(() => { clear(); statusCode == null ? statusSend(500) : get()}, 5000)
}


/**
 * Get function request
 */
function get() {
    var http = new XMLHttpRequest()
    http.open("GET", urlBase + "comments", true)
    http.setRequestHeader('Content-type', 'application/json')
    http.responseType = 'json'
    http.send()
    return http.onload = function () {
        if (this.status === 200) {
            includeComments(this.response)
        } else {
            errorComments(this.response, this.status)
            console.log(this.response)
        }
    }
}


/**
 * Inner Status
 * @param {Int} statusCode
 */
function statusSend(statusCode) {
    let errorClass = document.getElementById("status")
    let error
    if (statusCode == 200) {
        error = "<span class='alert-success' style='border-radius: 20px;padding: 0 10px;'><i class='fa fa-check-circle' aria-hidden='true'></i> Comentário cadastrado com sucesso!</span > ";
    } else if (statusCode == 500) {
        error = "<span class='alert-danger' style='border-radius: 20px;padding: 0 10px;'><i class='fa fa-exclamation-circle' aria-hidden='true'></i> Não foi possível conectar ao servidor! </span > ";
    } else {
        error = "<span class='alert-danger' style='border-radius: 20px;padding: 0 10px;'><i class='fa fa-exclamation-circle' aria-hidden='true'></i> Ocorreu um erro! </span > ";
    }
    errorClass.innerHTML = error
}


/**
 * Include Comments
 * @param {Array} comments
 */
function includeComments(comments) {
    let html = "";
    const listBody = document.getElementById("commentsList");

    if (comments.length > 0) {
        comments.forEach((comment) => {
            html += templateAddComments(comment.text, comment.url, comment.date)
        })
        listBody.innerHTML = html;
    }
}


/**
 * Check for error!
 * @param {String} erroStatus
 * @param {Int} statusCode
 */
function errorComments(erroStatus, statusCode) {
    const listBody = document.getElementById("commentsList");
    if (statusCode == 401) {
        listBody.innerHTML = templateNotFound()
    } else {
        listBody.innerHTML = templateError();
    }
}

/**
 ***************
 ** Helpers **
 ***************
 */

/**
 * playAudio
 * @param {String} url
 */
function playAudio(url) {
    document.getElementById(url).play()
}

/**
 * Clear function
 */
function clear() {
    document.getElementById("status").innerHTML = null
    document.getElementById("comment").value = null;
    const button = document.getElementById("button");
    button.disabled = false;
}


/**
 ***************
 ** Templates **
 ***************
 */

/**
 * Template for error
 * Code - 500
 */
function templateError() {
    return `<div class="col-12" style="display: grid;justify-content: center;">
    <lottie-player src="https://assets9.lottiefiles.com/datafiles/HF2l8DiOyOT4dwI/data.json" background="transparent"  speed="1"  style="width: 300px; height: auto;margin-top: -80px;" autoplay>
    </lottie-player>
    <span style='display:block; text-align: center; margin-top: -25px;font-weight: bold;'>
     Opss... ocorreu um erro no servidor!
    </span>
    </div>

    `;
}

/**
 * Template for error
 * Code - 401
 */
function templateNotFound() {
    return `<div class="col-12" style="display: grid;justify-content: center;">
    <lottie-player src="https://assets9.lottiefiles.com/datafiles/Qmze6foNYQLQGCK/data.json"  background="transparent"  speed="1"  style="width: 300px; height: auto;margin-top: -50px;"    autoplay></lottie-player>
    <span style='display:block; text-align: center; margin-top: -25px;font-weight: bold;'>
     Opss... Não encontramos nada!
    </span>
    </div>
    `;
}

/**
 * Template for add Coments
 * @param {String} text
 * @param {String} url
 * @param {String} date
 */
function templateAddComments(text, url, date) {
    const dateFormatted = new Date(date);
    const urlFormatted = urlBase + url;
    return `
    <div class='col-12 comments'>    
        <div class="col-2">
            <button class="btn btn-info btn-sm" onclick="playAudio('${urlFormatted}')" type="button" style='float: right'
                title='Escute o comentário'>
                <i class="fa fa-volume-up" aria-hidden="true"></i> Ouvir</button>
                <audio controls id='${urlFormatted}' style='display:none;'>
                    <source src="${urlFormatted}" type="audio/wav">
                </audio>
        </div>
    </div>
    `;
}

get();