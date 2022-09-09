import React from "react"
import Notes from "./Notes"
export default function Home(props) {
    const {showAlert} = props;//destructuring}
    
    return (
        <div>
          
            <Notes showAlert={showAlert}/>
        
        </div>
    )
}
