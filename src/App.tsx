import Header from './Components/LayoutItems/Header'
import Footer from './Components/LayoutItems/Footer'

function App() {

return (
    <>
    <Header/>
      <h1 className='text-4xl text-[#000000]'>Test title</h1>

      <button className='flex bg-red-500'>
        test button
      </button>
      <Footer/>
    </>
  )
}

export default App
