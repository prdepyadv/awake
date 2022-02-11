import React from 'react'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

class AddWord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            wordName: '', checkbox: false, duplicateWordError: false, error: true
        };
    }

    componentDidMount() {}
    componentWillUnmount() {}

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

        axios.get('/api/search',
         { params: { search_text: word } })
            .then((getData) => {
                getData.data.forEach(element => {
                    if(element.wordName && (element.wordName.toUpperCase() === word.toUpperCase())){
                        console.log('matched word %s', word);
                        this.setState({
                            duplicateWordError: true
                        })
                        return false;
                    }
                });
            })
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

        axios.post('/api/words/', {
            wordName
        }).then(() => {
            alert('Keyword saved.');
            this.setState({
                wordName: '', checkbox: false
            })
        })
    }

    render() {
        return (
            <div>
                <Form className="create-form"
                 error={this.state.duplicateWordError}>
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
                    
                    <Button type='submit' disabled={this.state.duplicateWordError || this.state.error}
                     onClick={this.postData}>Submit</Button>
                     <Message success icon='thumbs up' header='Nice job!' content='Keyword saved.'/>
                </Form>
            </div>
        )
    }
}
export default AddWord