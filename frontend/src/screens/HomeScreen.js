import React, { useState, useEffect } from 'react'
import AddWord from '../components/AddWord'
import axios from 'axios'
import '../App.css';

function HomeScreen() {
    const [words, setWords] = useState([])
    useEffect(() => {
        async function fetchWords() {
            const {data} = await axios.get('/api/words/')
            setWords(data)
            console.log(data);
        }
        fetchWords()
    }, [])

    return (
        <div className="main">
            <h2 className="main-header">@React Add-Word</h2>
            <div>
                <AddWord words={words} />
            </div>
        </div>
    )
}

export default HomeScreen
