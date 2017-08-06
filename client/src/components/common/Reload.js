import React from 'react'

const Reload = ({ onClick, href }) =>
  <div className="text-center" style={{ fontSize: 50 }}>
    <a href={href} onClick={onClick}>
      <i className="fa fa-refresh" />
    </a>
  </div>

// ==================
export { Reload }
