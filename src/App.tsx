// import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import './App.css'
import { MantineProvider } from '@mantine/core';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
