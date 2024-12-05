import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

   
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

   
    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

   
    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []); 

   
    function updateList(person) {
        postUser(person)
            .then((response) => response.json())  
            .then((userWithId) => {
                if (response.status === 201) {
                    setCharacters([...characters, userWithId]);  
                } else {
                    console.error("Failed to add user: Status code", response.status);
                }
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    }

    
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
    }

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;