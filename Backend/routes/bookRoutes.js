import express from 'express';
import { Book } from '../models/backModels.js'

const Router = express.Router();


Router.get('/',async (req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(201).json({
            count: books.length,
            books: books
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send({ message: err.message })  
    }
})

Router.post('/',async(req,res)=>{
    console.log(req.body)
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book);
    } catch(err)  {
        console.error(err);
        res.status(500).send({ message: err.message })
    }
})

Router.put('/:id',async (req,res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({ message: 'Book not found'})
        }
        return res.status(200).json(result)
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message })
    }
})

Router.delete('/:id',async (req,res) => {
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: "Book deleted succesfully"})
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})

export default Router;