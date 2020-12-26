const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
require("dotenv").config()

module.exports = {
    async synthesize(text, fileName = 'audio', format = 'audio/wav', voice = 'pt-BR_IsabelaV3Voice') {
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({
                apikey: `${process.env.TTS_API_KEY}`,
            }),
            serviceUrl: `${process.env.TTS_URL}`,
        })

        const params = {
            text: text,
            voice: voice,
            accept: format
        };
        const date = Date.now();
        await textToSpeech.synthesize(params)
            .then(response => {
                const audio = response.result;
                return textToSpeech.repairWavHeaderStream(audio);
            })
            .then(repairedFile => {
                fs.writeFileSync(__dirname + '/public/audio/' + fileName + date + '.wav', repairedFile);
                console.log(fileName + date + '.wav criado com sucesso!');
            })
            .catch(err => {
                throw err;
            });
        return {
            fileName: fileName + date + '.wav',
            fileDir: __dirname + '/public/audio/' + fileName + date + '.wav'
        }
    }

}
