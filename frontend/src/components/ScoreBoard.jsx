import React from 'react'
import { useSelector } from "react-redux";
const ScoreBoard = () => {
   const {score} = useSelector((state) =>state.game)
  return (
    <div>
        
    </div>
  )
}

export default ScoreBoard