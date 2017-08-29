import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header.js'
import RecipeList from './components/recipeList.js'
import Modal from './components/modal.js'
import EditModal from './components/editModal.js'

var getElement = (query) => {
  return document.querySelector(query);
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
        show: '',
        recipeList: localStorage['Recipes'],
        editModalData: ''
    }

  }

componentWillMount(){
  if(localStorage.getItem("Recipes") === null || localStorage.getItem("Recipes").length==2){
    localStorage.setItem('Recipes', `[{
      "recipeName": "Jaba The Hut Soup",
      "ingridients": ["Jaba Dookie", "Princess Leia Dookie", "Blood of Sith"],
      "amounts": ["5 quarts", "1 quart", "10oz"]
    }]`)
  }
}
showEditModal = (e) => {
  this.setState({editModalData:JSON.parse(this.state.recipeList)[e.target.getAttribute('id')]})
}
getRecipeListFromLocalStore = () =>{
  this.setState({recipeList:localStorage['Recipes']})
  console.log('recieved list from add/edit modal');
}

removeRecipeFromLocalStore = (e) =>{
  
  var recipeListParsed = JSON.parse(this.state.recipeList);
  var parsedCopy = recipeListParsed.slice();
  parsedCopy.splice(e.target.getAttribute('data-removeBtnIndex'),1)
  localStorage.setItem('Recipes', JSON.stringify(parsedCopy))
  this.setState({recipeList:JSON.stringify(parsedCopy)})


}
  render(){

    return(
      <div >
        <Header />
        <RecipeList showEditModal={this.showEditModal} removeRecipe={this.removeRecipeFromLocalStore} recipeList={this.state.recipeList} />
        <Modal giveRecipeList={this.getRecipeListFromLocalStore}/>
        <EditModal editModalData={this.state.editModalData} giveRecipeList={this.getRecipeListFromLocalStore}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, getElement('.container'))
