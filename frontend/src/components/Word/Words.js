import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ShowWords from './ShowWords'
import AddWord from './AddWord';
import './Words.css';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function Words(props) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        console.log('mounting');
        fetchWords();
        return () => {
            console.log('un-mounting');
            setWords([]);
        }
    }, []);

    async function fetchWords() {
        try{
            const {data} = await axios.get('/api/vocab/words/');
            setWords(data);
        } catch (error){
            console.log(error);
            return false;
        }
    }

    function syncWords() {
        fetchWords();
    }
    function updateWords(data) {
        setWords([...words, data]);
    }

    return (
        <div className='wordsPanel'>
            <div className='showWordsDiv'>
                <ShowWords words={words}/>   
            </div>
            <div className='addWordDiv'>
                <h2 className="main-header">@Vocab Add-Word</h2> 
                <AddWord words={words} updateWords={updateWords}
                    syncWords={syncWords}
                />           
            </div>
        </div>
    )
}

export default Words