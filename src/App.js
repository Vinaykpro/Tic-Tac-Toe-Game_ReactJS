import { useState } from 'react';
import './App.css';

const d = {"-1":"X",1:"O"}

export function App() {
  const [arr,setArray] = useState([0,0,0,0,0,0,0,0,0])
  const [player,setPlayer] = useState(-1)

  const [h,setH] = useState("92")
  const [r,setR] = useState("0deg")
  const [tX,setTX] = useState("0")
  const [tY,setTY] = useState("0")
  const [winner,setWinner] = useState("XO Game")

  const [display,setDisplay] = useState(true)

  function clickFun(id) {
      arr[id]=player
      setArray(arr)
      setPlayer(player*-1)

      var sum = 0
      var chks = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
      var lineConfig = [
      {r:"90deg",x:"-33vw",y:"0"},
      {r:"90deg",x:"0",y:"0"},
      {r:"90deg",x:"33vw",y:"0"},
      {r:"0deg",x:"-33vw",y:"0"},
      {r:"0deg",x:"0",y:"0"},
      {r:"0deg",x:"33vw",y:"0"},
      {r:"135deg",x:"0",y:"0"},
      {r:"45deg",x:"0",y:"0"}]
      for(let i in chks) {
        sum = 0
        for (let j in chks[i]) {
          sum += arr[(chks[i][j]-1)]
        }
        if(sum===-3 || sum===3) { let w = lineConfig[i]; setH(i>5?96:75); setR(w.r); setTX(w.x); setTY(w.y); setWinner((sum<0?d[-1]:d[1])+" Won!"); setDisplay(true); break; }
      }
    }
  

  function resetBoard() {
    setArray([0,0,0,0,0,0,0,0,0])
    setPlayer(player*-1)
    setDisplay(false)
  }

  return (
    <div className="App">
      <NavBar />
      {/* <p className="Center Bold">{arr}</p> */}
      <p>{d[player]+"'s Turn"}</p>
      <BoxLine h={h} r={r} tX={tX} tY={tY} display={display}/>
      <Box reset={resetBoard} display={display} winner={winner} />
      <div className="r1" style={{display:"flex"}}>
        <Grid id={0} a={arr} clickFun={clickFun} />
        <Grid id={1} a={arr} clickFun={clickFun} />
        <Grid id={2} a={arr} clickFun={clickFun} />
      </div>
      <div className="r1" style={{display:"flex"}}>
        <Grid id={3} a={arr} clickFun={clickFun} />
        <Grid id={4} a={arr} clickFun={clickFun} />
        <Grid id={5} a={arr} clickFun={clickFun} />
      </div>
      <div className="r1" style={{display:"flex"}}>
        <Grid id={6} a={arr} clickFun={clickFun} />
        <Grid id={7} a={arr} clickFun={clickFun} />
        <Grid id={8} a={arr} clickFun={clickFun} />
      </div>
      
    </div>
  );
}


function Box({reset,display,winner}) {

  function resetAndHide() {
    reset()
  }

  if(display)
  return (
    <div className="Box">
      <p className="WinnerTitle"> {winner} </p>
      <button onClick={resetAndHide}> {winner.includes("Won")? "Play Again":"Start"} </button>
    </div>
  );
}

function BoxLine({h,r,tX,tY,display}) {
  if(display)
  return (
    <div className="BoxLine" style={{transform:"rotate("+r+") translateX("+tX+") translateY("+tY+")"}}>
    <div className="Line" style={{ borderRadius:"10px", position:"absolute", height:"calc("+h+"vw)", width:"6vw",backgroundColor:"#ff0000",animation: "0.5s pop linear"}}>
    </div>
    </div>
  );
}


function Grid({id, a, clickFun}) {
  
  function clickFunc() {
    if(a[id]===0) 
    {
      clickFun(id)
    } 
  }
  return (
    <div id={"grid"+id} onClick={clickFunc} className="Grid">
    {d[a[id]]}
    </div>
  );
}
function NavBar() {
  return (
    <div style={ {height:"40px", width:"100%", backgroundColor:"#55c653", paddingBottom:"4px", } }>
     <p style={{ fontWeight:900, color:"white", fontSize:"32px", textAlignment:"center", width:"100%"}}> Tic Tac Toe </p>
    </div>
  );
}

