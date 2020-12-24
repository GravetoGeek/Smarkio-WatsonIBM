const {Comments} = require('../models')
const express = require('express')
const watson = require('../watson')
const Helpers = require('../helpers/Helpers')

module.exports = {
    /**
     * Set
     * @param {Request} req
     * @param {Response} res
     */
    // SET
    async set(req,res, next){
        const {text} = req.body
        if(Helpers.existsOrError(text)){
            return res.sendStatus(400).json({message: "Texto não informado"})
        }
        let textToSpeech
        try{
            textToSpeech = await watson.synthesize(text)
        }
        catch(error){
            console.log(error)
            return res.sendStatus(500).json(error)
            // return res.status(500).json({message:error})
        }
        let comments
        try{
            comments = await Comments.create(
                {
                    text: text,
                    upload_file: textToSpeech.fileName,
                    upload_dir: textToSpeech.fileDir
                }
            )
        }
        catch(error){
            console.log(error)
            return res.sendStatus(500).json(error)
            // return res.status(500).json(
            //     {
            //         message: error
            //     }
            // )
        }
        return res.sendStatus(200).json(
            {
                text: comments.dataValues.text,
                url: `audio/${comments.dataValues.upload_file}`

            }
        )
    },



    /**
     * Get
     * @param {Request} req
     * @param {Response} res
     */
    // GET
    async get(req,res){
        let comments;
        try{
            comments = await Comment.findAll()
        }
        catch (error){
            return res.status(500).json({message: error })
        }

        if(Helpers.existsOrError(comments)){
            return res.status(401).json({message: "Comentários não encontrado" })
        }

        const result = comments.map(
            (comment) => {
                return {
                    text: comment.text,
                    url: `audio/${comment.upload_file}`
                }
            }
        )

        return res.status(200).json(result)
    }
}