export const loginUser = async (email, password) => {
  try {

    const response = await fetch("https://server-social-96ny.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong.");
  }
};


export const RegisterUser = async (email, password, image, name) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("image", image);

    const response = await fetch("https://server-social-96ny.onrender.com/api/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error:", errorText);
      throw new Error("Invalid registration credentials. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in RegisterUser:", err);
    throw err;
  }
};

export const GetAllpost = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken')
    const response = await fetch("https://server-social-96ny.onrender.com/api/post/all-posts", {
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
      },
    })
    // method: "Get",


    if (!response.ok) {
      throw new Error("Invalid login credentials. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong.");
  }
};



export const CreatePost = async (title, image, token) => {
  try {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("image", image);
    for (let pair of formdata.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const response = await fetch(
      "https://server-social-96ny.onrender.com/api/post/create-post",
      {
        method: "POST",
        body: formdata,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Invalid registration credentials. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in CreatePost:", err);
    throw err;
  }
};


export const postComment = async (postId, commentContent) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch("https://server-social-96ny.onrender.com/api/post/create-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        postId,
        content: commentContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Failed to post comment. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postComment:", err.message);
    throw err;
  }




};


export const Likeposts = async (postId) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch("https://server-social-96ny.onrender.com/api/post/like-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        postId,
        // content: commentContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Failed to post comment. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postComment:", err.message);
    throw err;
  }
};




export const GetAlluser = async () => {
  try {
    const response = await fetch("https://server-social-96ny.onrender.com/api/user/all-users")


    if (!response.ok) {
      throw new Error("Invalid login credentials. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong.");
  }
};



export const Grupchats = async (id) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken)

    if (!jwtToken) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch("https://server-social-96ny.onrender.com/api/chat/create-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        secondId: id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Failed to post comment. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postComment:", err.message);
    throw err;
  }
};





export const Grupmessages = async (id) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken)

    if (!jwtToken) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch("https://server-social-96ny.onrender.com/api/message/get-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        chatId: id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Failed to post comment. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postComment:", err.message);
    throw err;
  }
};




export const createMesses = async (id, text) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken)

    if (!jwtToken) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch("https://server-social-96ny.onrender.com/api/message/create-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        chatId: id,
        text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Failed to post comment. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postComment:", err.message);
    throw err;
  }
};







export const postinviteFren = async (id) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      throw new Error("Token not found. Please log in.");
    }
    const response = await fetch("https://server-social-96ny.onrender.com/api/friend/add-friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        friendId: id,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      throw new Error("Failed to post comment. Please try again.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postComment:", err.message);
    throw err;
  }
};




export const getUserName = async () => {
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken) {
    throw new Error("Token not found. Please log in.");
  }
  try {
    const response = await fetch("https://server-social-96ny.onrender.com/api/get-detail", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
      }
    })
    if (!response.ok) {
      throw new Error("Invalid login credentials. Please try again.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Something went wrong.");
  }
};