import React, { useState } from 'react'
import './App.css'

function App() {

  type TBall = {
    clientX: number,
    clientY: number
  }

  const [clicked, setClicked] = useState<TBall[]>([])
  const [history, setHistory] = useState<TBall[]>([])


  let handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {clientX, clientY} = e;
    
    setClicked([...clicked, {clientX, clientY}])
  }

  function handleRedo(){
    const historyCopy = [...history];
    const historyBall = historyCopy.pop();
    if(!historyBall) return;
    setHistory(historyCopy);
    setClicked([...clicked, historyBall!])
  } 

  
  function handleUndo(){
    const clickedCopy = [...clicked];  //qual a diferença entre colocar [...clicked] e clicked ??
    const lastClicked = clickedCopy.pop() as TBall;
    if(!lastClicked) return;
    setHistory([...history, lastClicked])
    setClicked(clickedCopy);
  }

  return (
    <>
        <button onClick={handleUndo} disabled={clicked.length === 0}>undo</button>
        <button onClick={handleRedo} disabled={history.length === 0}>redo</button>
      <div className="App" onClick={handleClick}>
        {clicked.map((object, index)=>{
          const {clientX, clientY} = object;
          return <div className="ball" key={index} style={{left: clientX - 5+ 'px', top: clientY  - 10+ 'px'}}>O</div>
        })}
      </div>
    </>
  )
}

export default App
