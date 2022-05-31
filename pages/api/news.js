// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {news} from '../../example.js'

export default function handler(req, res) {
    if(req.method == "GET"){
        res.status(200).json(news)
    } else if (req.method === "POST") {
        const newtemps = {
            id:news.length,
            title: req.body.titles,
            categori: req.body.categori,
            content: req.body.content,
            image: req.body.thumbnail,
            url: req.body.banner,
        };
        news.push(newtemps);
        res.status(201).json(news);
    }
  }
  