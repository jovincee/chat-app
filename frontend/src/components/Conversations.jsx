import ConvBar from "./ConvBar.jsx";

const Conversations = () =>{
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            <ConvBar/>
            <ConvBar/>
            <ConvBar/>
            <ConvBar/>
        </div>
    );

}

export default Conversations;