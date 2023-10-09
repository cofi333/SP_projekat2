'use client'
import { Hero } from '../components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Hero/>
    </DndProvider>
  )
}
