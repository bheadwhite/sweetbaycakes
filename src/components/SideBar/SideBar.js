import React from 'react'
import './SideBar.css'

const sideBar = () => (
  <div className='sideBar'>
  <h3>Reference</h3>
  <div className='form-cakeSize-image'>
    <p>Use picture for sizing guide.</p>
    <img onClick={() => this.setState({ bigImage: true })} src='./img/cakeSize.png' alt='cake Sizes' />
  </div>
  <h5>*</h5>
  <p>You don't need to pick extra cost fillings but you will need to pick a buttercream.</p>
</div>
)

export default sideBar