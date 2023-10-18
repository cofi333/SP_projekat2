'use client'
import { Hero } from '../components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { useState, useEffect } from 'react'


export default function Home() {

  const [isTouch, setIsTouch] = useState(false);

  const checkTouchSupport = () => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
  };

  useEffect(() => {
    checkTouchSupport();
  }, []);

  const backend = isTouch ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <Hero/>
    </DndProvider>
  )
}
