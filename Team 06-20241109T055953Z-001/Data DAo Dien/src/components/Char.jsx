import { useState } from "react";
import { GetAlluser, Grupchats, Grupmessages, createMesses } from "../api/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";



const Chats = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [chats, setChat] = useState();
    const [valua, setValua] = useState([]);
    const fetchUser = async () => {
        try {
            const data = await GetAlluser();
            console.log("Full API Response:", data.users);
            setUsers(data.users);
        } catch (err) {
            console.error("Error fetching posts:", err.message);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);


    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState();

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        setMessages([...messages, { _id: Date.now(), text: newMessage, sender: "me" }]);
        setNewMessage("");
    };



    // // Lọc danh sách người dùng theo tìm kiếm
    // const filteredUsers = users.filter((user ) =>
    //     user.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const Grupchat = async (user) => {
        console.log(user)
        let res = await Grupchats(user._id);
        setChat(res.chat)
        console.log(res);
        // await Grupmessages(res.chat._id)
        let a = await Grupmessages(res.chat._id)
        console.log(a);

        setMessages(a)
        setSelectedUser(user);
    }

    const handleNewMessageChange = async (e) => {
        e.preventDefault()
        console.log(chats._id, valua);
        let a = await createMesses(chats._id, valua);
        console.log(a);



        // console.log(e.target.value
        // await Grupchat()
    };

    return (

        <div className="flex h-screen bg-gray-100">
            {/* Sidebar người dùng */}
            <div className="w-1/4 bg-white shadow-md border-r">


                <Link to="/home">
                    <p>
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" className="ml-6 mt-5" />

                    </p>
                </Link>
                <div className="p-4">
                    {/* Thanh tìm kiếm */}
                    {/* <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    /> */}
                </div>
                <div className="overflow-y-auto">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => Grupchat(user)}
                            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100   
                                }`}
                        >
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                            <p className="ml-3 font-medium text-gray-800">{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Khu vực nhắn tin */}
            <div className="flex-grow flex flex-col">
                {/* Header */}
                {/* <div className="flex items-center justify-between bg-white p-4 shadow-md">
                    <div className="flex items-center space-x-3">
                        <img
                            src={selectedUser.avatar}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">{selectedUser.name}</h2>
                    </div>
                    <button className="text-blue-500 font-semibold">Details</button>
                </div> */}

                {/* Chat Area */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {
                        messages.map((message) => (
                            <div
                                key={message._id}
                                className={`flex ${message.senderId !== selectedUser._id ? "justify-end" : "justify-start"}`}
                            >
                                {console.log(message.senderId, selectedUser._id)
                                }
                                <div
                                    className={`p-3 rounded-lg max-w-xs ${message.senderId !== selectedUser._id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleNewMessageChange}
                    className="flex items-center p-4 bg-white border-t border-gray-200"
                >
                    <input
                        type="text"
                        value={valua}
                        onChange={(e) => setValua(e.target.value)}
                        placeholder="Write a message..."
                        className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chats;
