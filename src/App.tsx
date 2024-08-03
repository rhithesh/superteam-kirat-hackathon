
import { Button } from './components/ui/button'

function App() {
  const handleClick  = () => {
    window.alert('Website in progress : let me cook !')
  }
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-3xl font-bold' >Web3 Hackathon</h2>
      <Button onClick={handleClick}>Click me</Button>
      </div>
    </>
  )
}

export default App
