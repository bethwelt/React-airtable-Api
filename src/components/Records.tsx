import * as React from "react"

export const Records: React.FC<any> = ({ record }) => {
 
  return (
    <div className="Record">
      <div>
        <h1>{record[0]}</h1>
        <p>{record[1].toString()}</p>
      </div>
    
    </div>
  )
}