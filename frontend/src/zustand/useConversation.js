import {create} from 'zustand';


const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages:[],
    unreadCount:0,
    setUnreadCount: (unreadCount) => set({ unreadCount }),
    setMessages: (messages) => set({ messages }),
 
    
    

}))

export default useConversation;