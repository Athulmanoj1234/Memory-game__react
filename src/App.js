import './App.css';
import {useEffect, useState} from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'confetti-react';



const gameIcons = [ "🔥", "😍", "👋", "👍", "😽", "🥲", "🥳", "🤬","🥸"];


function App() {

   const [pieces, setPieces] = useState([]);
   const {width, height} = useWindowSize();

   const shuffleGame = ()=> {
      
     const dupliArray = gameIcons.concat(gameIcons);
     console.log(dupliArray);
     
     const shuffledIcons = [];
    
     console.log(shuffledIcons);
    
    while( shuffledIcons.length < gameIcons.length * 2){  //to iterate upto 24 icons on each iterate
       const randIndex = Math.floor(Math.random() * dupliArray.length); //generates a random index to select an icon from dupliArray.
       shuffledIcons.push({
                emoji: dupliArray[randIndex],
                solved: false,
                flipped: false,
                position: shuffledIcons.length, 
          }); //adds the randomly chosen icon to shuffledIcons.
       dupliArray.splice(randIndex, 1); //removes that icon from the array by prohibiting it by selected again splice operation is performed on dupliArray
   }
        setPieces(shuffledIcons);   
        
      }
   
    
    useEffect(()=> {

       shuffleGame();

     }, [])

     const handleClick = (data) => {

        const newPieces = pieces.map(piece=> {
            
          if(piece.position === data.position){
            piece.flipped = !data.flipped;
          }
           return piece;
         })
           setPieces(newPieces);
     }
     console.log(pieces);

  const gameLogic = () => {

      const filteredData = pieces.filter(data=> data.flipped && !data.solved )
      console.log(filteredData);

      if(filteredData.length === 2){ 
         if(filteredData[0].emoji === filteredData[1].emoji){

          setPieces(pieces.map(data=> {

          if(data.position === filteredData[0].position || data.position === filteredData[1].position){
            data.solved = true
          }
          
           return data;

          })) 

        }else{

       setTimeout(()=> {  //setTimout will work only if the pieces array have length 2
        setPieces(pieces.map(data=> {
          if(data.position === filteredData[0].position || data.position === filteredData[1].position){
           
            data.flipped = false
          }
            return data;
          }));
        }, 800);
        }
     
     } 
} 

const gameIsCompleted = ()=> {
    
   return pieces.every(piece=> piece.solved === true);
       
}

   
  useEffect(()=> {
       gameLogic();
       if(pieces.length > 0){ 
       }
      }, [pieces])

  return (
   <main>
    <h1>memory game</h1>
    { gameIsCompleted() && 
       (  
         <>
       <Confetti width={width} height={height} /> 
       <h3 style={{textAlign: 'center', color: 'white'}}>You Win</h3>
        </>
       ) }
    
    <div className="App">
     {pieces.map((data, index)=> (
      <div className={`flip-card ${data.flipped || data.solved ? "active" : ""}`} 
         key={index} 
           onClick={()=> handleClick(data)}>
      <div className="flip-card-inner">
      <div className="flip-card-front">
      </div>
      <div className="flip-card-back">
       <p>{data.emoji}</p>
     </div>
      </div>
    
     </div >
        )  )}
      </div>
   </main>
  );
}

export default App;
