"use client"

import DragAndDrop from '@/components/DragAndDrop'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'  

export default function Home() {
  return (
    <main>
      <DndProvider backend={HTML5Backend} >
        <DragAndDrop />
      </DndProvider>
    </main>
  )
}
