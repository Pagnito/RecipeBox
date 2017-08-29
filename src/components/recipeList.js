import React from 'react'
import '../styles/recipeList.scss'
import ModalBtn from './modalTrigger'


const RecipeList = (props)=> {
  var recipeListParsed = JSON.parse(props.recipeList);


  var recipeList = recipeListParsed.map(function(item,index){

    var ingList = Object.values(item)[1].map(function(item,index){
      return <li className="topBorder" key={index}>{item}</li>
    })

    var amountList = Object.values(item)[2].map(function(item,index){
      return <li className="topBorder"key={index}>{item}</li>
    })

    return (<li key={index}>
            <div  className="collapsible-header recipeListHeader">
              <i className="material-icons">whatshot</i>
                {item.recipeName}
              <i onClick={props.showEditModal} href="#modal2" id={index} className="material-icons modal-trigger rightNextTo hoverPop">mode_edit</i>
              <i onClick={props.removeRecipe} data-removeBtnIndex={index} className="material-icons right hoverPop">close</i>
            </div>
            <div className="collapsible-body recipeDrop">
              <div className="row">
                <div className="col ingListCol listCol">
                  <ul>
                    {ingList}
                  </ul>
                </div>
                <div className="col amountlistCol">
                  <ul>
                    {amountList}
                  </ul>
                </div>
              </div>
            </div>
           </li>)
})

    return (
      <div className=""  id="recipeList">
        <ModalBtn />
      <div className="row ">
           <div className="col recipeListWrap s10 m8 l8 offset-s1 offset-m2 offset-l2">
              <ul id="recipeL" className="collapsible recipeListScroll" data-collapsible="expandable">
                {recipeList}
              </ul>
            </div>
      </div>


      </div>
    )


}

export default RecipeList
