import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import App from './App';
import rootNode from 'route-node';



var Quiz = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return -.extend({
            bgClass: 'neutral',
            showContine: false
        }, this.props.data.selectGame());
    },
    handleBookSelected: function(title){
        var isCorrect = this.state.checkAnswer(title);
        this.setState({
            bgClass: isCorrect ? 'pass' : 'fail',
            showContine: isCorrect
        });
    },

    handleContinue: function(){
        this.setState(this.getInitialState());
    },

    handleAddGame: function(){
        routie('add');
    },

    render() {
        return (<div>
            <div className="row">
                <div className="col-md-4">
                    <img src={this.state.author.imgUrl} className="authorimage col-md-3"/>
                </div>
                <div className="col-md-7">
                    {this.state.books.map(function (b) {
                        return <Book onBookSelected={this.handleBookSelected} title={b}/>
                    }, this)}
                </div>
                <div className={"col-md-1" + this.state.bgClass}>

                </div>
                {this.state.showContine ? (
                <div className="row">
                <input onClick={this.handleContinue} type="button" className="btn btn-primary" value="Contutiu" />)
                </div> : <span/>
                }

                <div className="row">
                    <input onClick={this.handleAddGame} id="addGameButton" type="button" value="Add Game" class="btn" />
                 </div>

            </div>
            
        );
    }
});

var Book = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired
	},
    
    handleClick: function(){
        this.props.onBookSelected(this.props.title);
    }

	render: function() {
		return <div onClick={this.handleClick} className="answer">
			<h4>{this.props.title}</h4>
		</div>
	}
});

var AddGameForm = React.createClass({

    handleSubmit: function(){
        propTypes:{
            onGameFormSubmit: React.PropTypes.func.isRequired
        },
       this.props.onGameFormSubmit(getRefs(this));
        return false;
    }
    render: function(){
       return <div class="row">
            <h1>Add Game</h1>
            <form role="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                        <input ref="imageUrl" type="text" className="form-control" placeholder="Image Url"/>
                        </div>
                        <div className="form-group">
                          <input ref="answer1" type="text" className="form-control" placeholder="answer1"/>
                        </div>
                        <div className="form-group">
                          <input ref="answer2" type="text" className="form-control" placeholder="answer2"/>
                        </div>
                        <div className="form-group">
                          <input ref="answer3" type="text" className="form-control" placeholder="answer3"/>
                        </div>
                        <div className="form-group">
                          <input ref="answer4" type="text" className="form-control" placeholder="answer4"/>
                        </div>
                    <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>;
    }
});

var data = [
    {
        name: 'Jane Austen',
        imgUrl: 'images/austen.jpg',
        books: [
            'Pride and Prejudice',
            'Sense and Sensibility',
            'Emma' 
            ]
    },
    {
        name: 'Charles Dickens',
        imgUrl: 'charles-dickens.jpg',
        books: [
            'A Tale of Two Cities',
            'A Christmas Carol',
            'David Copperfield',
            'Bleak House'
        ]
    },
    {
        name: 'Sigmunnd Freud',
        imgUrl: 'fitzgerald.jpg',
        books: [
            'Jokes and Their Relation to the Unconscious',
            'Civilization and Its Discontents',
            'The Interpretation of Dreams'
        ]
    },
    {
        name: 'Hemingway',
        imgUrl: 'hemingway.jpg',
        books: [
            'Thus Spake Zarathustra',
            'Ecce Homo',
            'Beyond Good and Evil',
            'Twilight of the Idols'
        ]
    },
    {
        name: 'Orwell',
        imgUrl: 'orwell.jpg',
        books: [
            'King Lear',
            'A Midsummer Night\'s Dream',
            'Hamlet',
            'Richard III',
            'The Comedy of Errors'
        ]
    },
    {
        name: 'Mark Twain',
        imgUrl: 'twain.jpg',
        books: [
            'Huckleberry Finn',
            'Tom Sawyer',
            'A Connecticut Yankee at King Arthur\'s Court'
        ]
    }
];

var selectGame = function(){
    var books = _shuffle(this.reduce(function(p, c, i){
        return p.concat(c.books)
    }, [])).slice(0,4);

    var answer = books[_.random(books.length -1)];

    return {
        books: books,
        author: _.find(this, function (author) {
            return author.books.some(function(title){
                return title === answer;
            });
        }),

        checkAnswer = function(title){
            return this.author.books.some(function(t){
                return t ===title;
            });
        }
    };

    data.selectGame = selectGame;
     routie({
        '': function(){
        React.renderComponent(<Quiz data={data} />,
            document.getElementById('root'));
       },
       'add': function(){
        React.renderComponent(<AddGameForm  onGameFormSubmit={handleAddFormSubmitted} />,
            document.getElementById('root'));
       }
    });

    function handleAddFormSubmitted (data){
        var quizData = [{
            imageUrl: data.imageUrl,
            books: [data.answer1, data.answer2, data.answer3, data.answer4]
        }];
        quizData.selectGame = selectGame;
        React.renderComponent(<Quiz data={quizData} />,
            document.getElementById('root'));
     }

     function getRefs(component){
        var result = {};
        Object.keys(component.refs).forEach(function(refname){
            result[refname] = component.refs[refname].getDOMNode().value;
        })
        return result;
     }

};



Quiz.propTypes = {
 propArray: PropTypes.array.isRequired, 
 propBool: PropTypes.bool.isRequired,
 propFunc: PropTypes.func,
 propNumber: PropTypes.number,
 propString: PropTypes.string,
 propObject: PropTypes.object
}

