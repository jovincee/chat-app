import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";

const Sidebar = () => {
    return(
        <div>

            <SearchInput/>
            <div className='divider px-3'></div>
            <Conversations />
            {/* <Conversations />
            <LogoutButton /> */}




        </div>



    );
};

export default Sidebar;