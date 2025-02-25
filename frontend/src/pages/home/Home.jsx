
import Sidebar from "../../components/Sidebar.jsx";


const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-1g overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />           {/*Left*/}
      <div className='divider px-3'></div>
  
      {/* <MessageContainer />    Right */}
      
    </div>
  )
}

export default Home;
