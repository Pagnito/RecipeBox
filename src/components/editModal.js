import React from 'react'

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


class EditModal extends React.Component {
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
  componentWillReceiveProps(nextProps) {
  if (nextProps.editModalData.recipeName !== this.state.recipeName) {
    this.setState({ recipeName: nextProps.editModalData.recipeName,
                    ingridients: nextProps.editModalData.ingridients,
                    amounts: nextProps.editModalData.amounts
                  })
  }
}

  editRemoveIng=(e)=>{
    var copyAmnts = this.state.amounts.slice();
    var copyIngs = this.state.ingridients.slice();
    copyIngs.splice(e.target.getAttribute('data-editModalRemoveBtn'),1)
    copyAmnts.splice(e.target.getAttribute('data-editModalRemoveBtn'),1)
    this.setState({ingridients:copyIngs,
                   amounts:copyAmnts})
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





    editAddIng = () => {
      var newIng = this.state.ingridients.slice();
      newIng.push(this.state.ingridient)
      this.setState({ingridients: newIng})

      var newAmounts = this.state.amounts.slice();
      newAmounts.push(this.state.amount)
      this.setState({amounts: newAmounts})

      this.setState({ingridient:''})
      this.setState({amount:''})
  }


  sendRecipeToStorage =()=> {
    if(this.state.recipeName!==''){
          var recipe = new recipeObj(this.state.recipeName,this.state.ingridients,this.state.amounts)
          var localStoreArr = JSON.parse(localStorage['Recipes'])
          localStoreArr.splice(localStoreArr.findIndex((el) => {return el.recipeName==this.state.recipeName}),1,recipe)
          localStorage.setItem('Recipes', JSON.stringify(localStoreArr))

          getElement('modalForm').reset()


        }
  }
  render(){

    var editAddIngRow = this.state.ingridients!==undefined ? this.state.ingridients.map( (item, index) => {
        return (
        <tr key={index} className="wtf">
          <td className="d padLeft">{this.state.ingridients[index]}</td>
          <td className="padLeft">{this.state.amounts[index]}</td>
          <td data-editModalRemoveBtn={index} onClick={this.editRemoveIng}className="padLeft remove"><i className="material-icons removeX">close</i></td>
        </tr>
      )
    }) : [1,2].map( (item, index) => {
        return (
        <tr key={index} className="wtf">
          <td className="d padLeft"></td>
          <td className="padLeft"></td>
          <td data-editModalRemoveBtn={index} onClick={this.editRemoveIng}className="padLeft remove"><i className="material-icons removeX">close</i></td>
        </tr>
      )
    })
    return (
      <div>
        <div id="modal2" className="modal modal-fixed-footer">
        <form id="modalForm" >
          <div className="modal-content">
            <div className="input-field col">
              <input onChange={this.handleRecipeName} value={this.state.recipeName}  id="recipeName" type="text" className="validate" />
            <label className="active">Recipe Name</label>
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
             <a onClick={this.editAddIng} id="ingAdd"className="waves-effect waves-light btn-floating btn-medium modalBtn"><i className="material-icons">add</i></a>
            </div>
          </div>
          <div className="row">
            <div className="col ingListWrap">
              <table className="collection" id="ingList">
                <tbody>
                {editAddIngRow}
                </tbody>
              </table>
            </div>

          </div>
          </div>
          <div onClick={this.props.giveRecipeList} className="modal-footer">
            <a onClick={this.sendRecipeToStorage} href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Done</a>
          </div>
          </form>
        </div>
        </div>
    )

  }
}
export default EditModal
