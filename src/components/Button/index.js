import React from 'react'

const Button = ({type, children, onClick}) => {
  return (
    <button 
      className={`btn ${type ? type : false}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button