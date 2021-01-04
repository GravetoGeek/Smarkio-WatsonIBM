/************
 ** CONFIG **
 ************/
const urlBase = document.URL;


/**
* Template for add Coments
* @param {String} text
* @param {String} url
* @param {String} date
*/
function templateComments(text, url) {
    // const dateFormatted = new Date(date);
    const urlFormatted = urlBase + url;
    return `
    <li>
        <i class="fa fa-comment" aria-hidden="true"></i>
        <p class="col-8">${text}</p>
        <button type="button" onclick="playAudio('${urlFormatted}')" class="btn btn-secondary col-2 offset" title='Escute o comentário'><i class="fa fa-volume-up" aria-hidden="true"></i>Ouça</button>
        <audio controls id='${urlFormatted}' style='display:none'>
            <source src="${urlFormatted}" type="audio/wav">
        </audio>
    </li>
    `
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
            html += templateComments(comment.text, comment.url)
        })
        listBody.innerHTML = html;
    }
}



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
        statusSend(this.status);
        statusCode = this.status;
        get()
    }
    http.open("POST", urlBase + "comments", true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify({ text: comment }))
    setTimeout(() => {
        clear()
        statusCode == null ? statusSend(500) : get()
    }, 15000)
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
        if (this.status == 200) {
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
        error = "<span class='alert-success'><i class='fa fa-check-circle' aria-hidden='true'></i> Comentário cadastrado com sucesso!</span > ";
    } else if (statusCode == 500) {
        error = "<span class='alert-danger'><i class='fa fa-exclamation-circle' aria-hidden='true'></i> Não foi possível conectar ao servidor! </span > ";
    } else {
        error = "<span class='alert-danger'><i class='fa fa-exclamation-circle' aria-hidden='true'></i> Ocorreu um erro! </span > ";
    }
    errorClass.innerHTML = error
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



get();