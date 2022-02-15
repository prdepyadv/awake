import React, {Component} from 'react'

export default class ShowWords extends Component {
    constructor(props){
        super(props);
        this.state = {words: this.props && this.props.words && 
            this.props.words.length ? this.props.words : []};
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.words !== this.props.words) {
            this.setState({
                words: this.props && this.props.words && this.props.words.length ? this.props.words : []
            })
        }
    }

    filterWords = () => {
        let searchByKeyWord = document.getElementById('searchWord').value;
        if(!searchByKeyWord){
            this.setState({
                    words: this.props && this.props.words && this.props.words.length ? this.props.words : []
                });  
        } else if(!(this.props && this.props.words && this.props.words.length)){
            this.setState({
                words: []
            });
        }

        let filteredWords = [];
        this.props.words.forEach((data) => {
            if(data.wordName.toUpperCase().includes(searchByKeyWord.toUpperCase())){
                filteredWords.push(data);
            }
        })
        this.setState({
            words: filteredWords
        });
    }

    render() {
        return (
            <div className="words">
                <div className="wordsTitle"><b>Words List</b></div>
                <input type='text' id='searchWord'
                className='searchWord'
                placeholder='Search any word' onChange={(e) => {
                    this.filterWords();
                }}
                name='search_word' />

                <div className='filteredWords'>
                    { this.state.words ? (this.state.words.map((data) => (
                    <div key={data._id ?? Math.random()} className="word">
                        {data.wordName ? this.capitalizeFirstLetter(data.wordName) : 'Empty'}</div>
                ))) : <div className="word">No Words</div>}
                </div>
            </div>
            )
    }
}