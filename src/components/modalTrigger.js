import React from 'react'
import '../styles/modalTrigger.scss'
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
const ModalBtn = () => {
  return (
    <div id="modalBtn">
     <a className="waves-effect waves-light btn-floating btn-large modalBtn modal-trigger" href="#modal1"><i className="material-icons">add</i></a>
     
    </div>
  )
}
export default ModalBtn
