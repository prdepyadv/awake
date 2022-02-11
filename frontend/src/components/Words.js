import React, { Component } from 'react'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';
import ShowWords from '../components/ShowWords'
import '../App.css';

export default class Words extends Component {
    constructor(props){
        super(props);
        this.state = {
            wordName: '', checkbox: false, 
            duplicateWordError: false, error: true,
            success: false, words: []
        };
    }

    componentDidMount() {
        this.fetchWords();
    }
    componentWillUnmount() {
        console.log('Unmounting');
    }

    checkData = () => {
        let word = document.getElementById('new_word').value;
        this.setState({
            duplicateWordError: false, error: false
        })
        if(! word || word.length < 3 || word > 50){
            this.setState({
                error: true
            })
            return false;
        }

        setTimeout(async () => {
            try{
                this.fetchWords();
                this.state.words.forEach(element => {
                    if(element.wordName && (element.wordName.toUpperCase() === word.toUpperCase())){
                        console.log('matched word %s', word);
                        this.setState({
                            duplicateWordError: true
                        })
                        return false;
                    }
                });
            } catch (error){
                console.log(error.response && error.response.status === 404 ? 'Keyword not found.' : error);
                return false;
            }
        }, 500);
    }

    postData = () => {
        let wordName = this.state.wordName;
        if(this.state.duplicateWordError){
            alert('Duplicate Keyword');
            return false;
        } else if(wordName.length < 3 || wordName > 50){
            alert('Invalid Keyword');
            return false;
        } else if(!this.state.checkbox) {
            alert('Please accept Terms & Conditions first');
            return false;
        }
        this.state.words.forEach((data) => {
            if(wordName.toUpperCase() === data.wordName.toUpperCase()){
                this.setState({
                    duplicateWordError: true
                })
                return false;
            }
        })  

        axios.post('/api/words/', {
            wordName
        }).then((response) => {
            let dat = response.data;
            this.setState({
                wordName: '', checkbox: false, success: true,
                words: [...this.state.words, dat]
            })
            setTimeout(() => {
               this.setState({success: false});
            }, 3000)
        })
    }

    async fetchWords() {
        try{
            const {data} = await axios.get('/api/words/')
            this.setState({
                words: data
            });
            return true;
        } catch (error){
            console.log(error);
            return false;
        }
    }

    render() {
    return (
    <div className='wordsPanel'>
        <div className='showWordsDiv'>
            <ShowWords words={this.state.words}/>   
        </div>
        <div className='addWordDiv'>
            <h2 className="main-header">@React Add-Word</h2>
            <div>
            <Form className="create-form" onSubmit={this.postData}
            error={this.state.duplicateWordError}
            success={this.state.success}>
                <Form.Field>
                    <label>New Word</label>
                    <input placeholder='Start typing here...' 
                    value={this.state.wordName} minLength={3} maxLength={50} 
                    name="new_word" id="new_word" 
                    onChange={    
                        (e) => {
                            this.setState({
                                duplicateWordError: false, wordName: e.target.value
                            });
                            this.checkData();
                        }
                    } />
                </Form.Field>

                <Message error header='Error' content="Duplicate keyword"/>
                
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions'
                    checked={this.state.checkbox} 
                    onChange={(e) => this.setState({checkbox: !this.state.checkbox})}/>
                </Form.Field>
                
                <Button type='submit' 
                disabled={this.state.duplicateWordError || this.state.error}>Submit</Button>

                <Message success icon='thumbs up' header='Nice job!' content='Keyword saved.'/>
            </Form>
            </div>
        </div>
    </div>
    )
    }
}