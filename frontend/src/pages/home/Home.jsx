
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import MessageContainer from "../../components/messages/MessageContainer.jsx";


const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-1g overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />           {/*Left*/}
      <div className='divider'></div>
  
      <MessageContainer />   
      
    </div>
  )
}

export default Home;
