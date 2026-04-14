import { useDebugValue, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [pokemons,setpok] = useState([
    {name:'Pikachu',img:''},
    {name:'Charizard',img:''},
    {name: 'Ditto',img:''},
    {name: 'Charmeleon',img:''},
    {name: 'Blastoise',img:''},
    {name: 'Wartortle',img:''},
    {name: 'Squirtle',img:''},
    {name: 'Charmander',img:''},
    {name: 'Bulbasaur',img: ''},
    {name: 'Caterpie',img:''},
    {name:'Butterfree',img: ''},
    {name:'Weedle',img:''},
    {name:'Kakuna',img:''},
    {name:'Beedrill',img:''},
    {name: 'Pidgey',img:''},
    {name:'Pidgeotto',img:''},
    {name:'Rattata',img:''},
    {name:'Raticate',img:""},
    {name:'Spearow',img:''},
    {name:'Fearow',img:''},
    {name:'Ekans',img:''},
    {name:'Arbok',img:''},
    {name:'Raichu',img:''},
    {name:'Sandshrew',img:''},
    {name:'Sandslash',img:''},
    {name:'Nidorino',img:''},
    {name:'Nidorina',img:''},
    {name:'Nidoqueen',img:''}

  ])
  const [currentscore , setcur] = useState(0)
  const [maxscore , setmax] = useState(0)
  const [selecarr , setselec] = useState([])


  useEffect(() => {
    if(selecarr.length > 0){
      const lastel = selecarr[selecarr.length-1]

      if(selecarr.slice(0 , selecarr.length-1).includes(lastel)){
        if(currentscore>maxscore) setmax(currentscore)
        setcur(0)
        setselec([])
      }
      else{
        setcur(prev => prev + 1)
      }
    }
  
  },[selecarr])

  function UpdSelec(ev){
    const cur = ev.target.alt
    setselec(prev => [...prev , cur])
   
  }



  function ShufPok(){

  
    const temppoks = [...pokemons]
    for(let i = temppoks.length-1;i>0;i--){
      const j = Math.floor(Math.random() * (i+1))
      if(temppoks[i] && temppoks[j]){
        [temppoks[i],temppoks[j]] = [temppoks[j],temppoks[i]]

      }else{
        console.log("Invalid Element during shuffle")
      }
      

    }

    setpok(temppoks)
  


  }

  useEffect(() => {
    const fetchpok = async () => {
      const updpok = await Promise.all(
        pokemons.map(async (pok) => {
          const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pok.name}`)
          const data = await resp.json()
          return {
            ...pok , 
            img: data.sprites.front_default
          }
        })
      )
      setpok(updpok)
    }
    fetchpok()
   
  },[])
  return(
    <>
    <div className='gen'>
      <h1>Let's Test Your Memory</h1>
      <p>Current Score: <span id = 'curscr'>{currentscore}</span></p><p>{'\n'}</p>
      <p>High Score: <span id = 'highscr'>{maxscore}</span></p>
      
    </div>
    <div className='cardcont'>
      {pokemons.map((elem) => {
        
        return (
          <div key={elem.name} className='card'>
            <img src={elem.img} alt={elem.name} onClick={(ev) => {ShufPok(); UpdSelec(ev)}}></img>
            <h2>{elem.name}</h2>
          </div>
        )
      })}
     
  
    </div>
  
    </>
  )
}

export default App
