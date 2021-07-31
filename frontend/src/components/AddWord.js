import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
    let history = useHistory();
    const [wordName, setWordName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [duplicateWordError, setDuplicateWordError] = useState(false);

    const checkData = () => {
        var word = document.getElementById('new_word').value;
        if(word){
            axios.get('/api/search', { params: { search_text: word } })
                .then((getData) => {
                    getData.data.forEach(element => {
                        if(element.wordName && (element.wordName.toUpperCase() === word.toUpperCase())){
                            console.log('matched word %s', word);
                            setDuplicateWordError(true);
                            return false;
                        }
                    });
                })
        }
        
    }

    const postData = () => {
        if(duplicateWordError){
            alert('Duplicate Keyword');
            return false;
        } else if(wordName.length < 3 || wordName > 50){
            alert('Invalid Keyword');
            return false;
        } else if(!checkbox) {
            alert('Please accept Terms & Conditions first');
            return false;
        }

        axios.post('/api/words/', {
            wordName
        }).then(() => {
            alert('Saved');
            setWordName('');
            setCheckbox(false);
        })
    }


    return (
        <div>
            <Form className="create-form" error={duplicateWordError}>
                <Form.Field>
                    <label>New Word</label>
                    <input placeholder='Start typing here...' value={wordName} minLength={3} 
                    maxLength={50} name="new_word" id="new_word" 
                    onChange={    
                        (e) => {setWordName(e.target.value);setDuplicateWordError(false);checkData();}
                        } />
                </Form.Field>
                <Message error header='Error' content="Duplicate keyword"/>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions'
                    checked={checkbox} 
                    onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                
                <Button type='submit' onClick={postData}>Submit</Button>
            </Form>
        </div>
    )
}