'use client'
import { Hero } from '../components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { useState, useEffect } from 'react'


export default function Home() {

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTouch(window.innerWidth <= 768); 
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const backend = isTouch ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <Hero/>
    </DndProvider>
  )
}
