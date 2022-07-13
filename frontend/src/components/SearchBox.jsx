import React from 'react'
import {Form, Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = React.useState("")

    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
            setKeyword("")
        }else{
            navigate("/")
        }
    }
  return (
    <Form onSubmit={submitHandler} className="form-inline">
        <Form.Control type="text" value={keyword} name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Products..." className="mr-sm-2 ml-sm-4">
        </Form.Control>
        <Button type="submit" variant="outline-success" className="p-2">Search</Button>
    </Form>
  )
}

export default SearchBox