import React, { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import Form from '../Form';


// import style
import "./style.scss";
 
function DBase() {
    const [articles, setArticles] = useState([])
    const [editedArticle, setEditedArticle] = useState(null)
  
    useEffect(() => {
      fetch('http://127.0.0.1:5000/get', {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      //.then(resp => console.log(resp))
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  
    },[])

    const editArticle = (article) => {
      //console.log("Hello World")
      setEditedArticle(article)
    }

    //<ArticleList articles = {articles} editArticle = {editArticle}/>
    //<ArticleList articles = {articles}/>

    return (
      <div className="DBase">
        <br/>
        <br/>

        <ArticleList articles = {articles} editArticle = {editArticle}/>

        {editedArticle ? <Form article = {editedArticle}/> : null}
        
      
    </div>
   );
}

export default DBase