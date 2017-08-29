import React from 'react'
import '../styles/modal.scss'

$(document).ready(function(){
    $('.modal').modal();

  });

  var getElement = (query) => {
    return document.getElementById(query);
  }

  function recipeObj(recipeName,ingridients,amounts) {
    this.recipeName = recipeName;
    this.ingridients = ingridients;
    this.amounts = amounts;
 }


class Modal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ingridients: [],
      amounts: [],
      ingridient: '',
      amount: '',
      recipeName: ''
    }

  }
  removeIng=(e)=>{
    var copyAmnts = this.state.amounts.slice();
    var copyIngs = this.state.ingridients.slice();
    copyIngs.splice(e.target.getAttribute('data-modalRemoveIngBtn'),1)
    copyAmnts.splice(e.target.getAttribute('data-modalRemoveIngBtn'),1)
    this.setState({ingridients:copyIngs})
    this.setState({amounts:copyAmnts})
  }
  handleIngChange = (e) => {
    this.setState({ingridient:e.target.value})

  }
  handleAmountChange = (e) => {
    this.setState({amount:e.target.value})

  }
  handleRecipeName= (e) => {
    this.setState({recipeName:e.target.value})

  }


    addIng = () => {
      var newIng = this.state.ingridients.slice();
      newIng.push(this.state.ingridient)
      this.setState({ingridients: newIng})

      var newAmounts = this.state.amounts.slice();
      newAmounts.push(this.state.amount)
      this.setState({amounts: newAmounts})

      this.setState({ingridient:''})
      this.setState({amount:''})
  }


  addRecipeToStorage =()=> {
    if(this.state.recipeName!==''){
          var recipe = new recipeObj(this.state.recipeName,this.state.ingridients,this.state.amounts)
          var localStoreArr = JSON.parse(localStorage['Recipes'])
          localStoreArr.push(recipe)
          localStorage.setItem('Recipes', JSON.stringify(localStoreArr))

          getElement('modalForm').reset()
          this.setState({recipeName:''})
          this.setState({ingridients:[]})
          this.setState({amounts:[]})
        }
  }
  render(){
    var addIngRow = this.state.ingridients.map( (item, index) => {
        return (

        <tr key={index} className="wtf">
          <td className="d padLeft">{this.state.ingridients[index]}</td>
          <td className="padLeft">{this.state.amounts[index]}</td>
          <td data-modalRemoveIngBtn={index} onClick={this.removeIng} className="padLeft remove"><i className="material-icons removeX">close</i></td>
        </tr>
      )
    })
    return (
      <div>
        <div id="modal1" className="modal modal-fixed-footer">
        <form id="modalForm" >
          <div className="modal-content">
            <div className="input-field col">
            <input onChange={this.handleRecipeName} value={this.state.recipeName} id="recipeName" type="text" className="validate" />
            <label>Recipe Name</label>
          </div>
          <br/>
          <div className="row">
            <div className="input-field col s8 l6 m6 xl6">
               <input onChange={this.handleIngChange} value={this.state.ingridient} id="ingridient" type="text" className="validate" />
               <label>Ingridient</label>
             </div>
            <div className="input-field col s4 l2 m2 xl2 ">
                <input onChange={this.handleAmountChange} value={this.state.amount} id="amount" type="text" className="validate" />
                <label>Amount</label>
            </div>

            <div id="ingAddWrap" className="col s12 l2 m2 xl2">
             <a onClick={this.addIng}id="ingAdd"className="waves-effect waves-light btn-floating btn-medium modalBtn" ><i className="material-icons">add</i></a>
            </div>
          </div>
          <div className="row">
            <div className="col ingListWrap">
              <table className="collection" id="ingList">
                <tbody>
                {addIngRow}
                </tbody>
              </table>
            </div>

          </div>
          </div>
          <div onClick={this.props.giveRecipeList} className="modal-footer">
            <a onClick={this.addRecipeToStorage} href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Add</a>
          </div>
          </form>
        </div>
        </div>
    )
  }
}
export default Modal
