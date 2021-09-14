
import React, {useState} from 'react'
import APIService from './APIService'

function Form(props) {

    const [title, setTitle] = useState(props.article.title)
    const [body, setBody] = useState(props.article.body)

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, body})
        .then(resp => console.log(resp))
        .catch(error => console.log(error))

    }


    return (
        <div>
            {props.article ? (
                <div className = "mb-3">

                <label htmlfor = "title" className = "form-label">Title</label>
                <input type = "text" className = "form-control"
                value = {title}
                placeholder = "Please Enter Title"
                onChange = {(e) => setTitle(e.target.value)}
                />

                <label htmlfor = "body" className = "form-label">Description</label>
                <textarea
                rows = "5"
                value = {body}
                onChange = {(e) => setBody(e.target.value)}
                className = "form-control"
                placeholder = "Please Enter Description"

                />
                <button
                onClick = {updateArticle}
                className = "btn btn-success mt-3"
                >Update</button>

                </div>


            ):null}


        </div>
    )
}

export default Form
