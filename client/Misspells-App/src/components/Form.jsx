import React, { useState } from 'react';

function Form({method}) {
  const [id, setId] = useState('');
  const [mongoId, setMongoId] = useState('');
  const [caption, setCaption] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    let sendData = {
      "ID": id,
      "Caption": caption,
      "URL": imageLink
    };

    if (method === "POST") {
      fetch("https://s58-funnymisspells.onrender.com/routes/Create", {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then((data) => { console.log(data); })
        .catch((error) => console.log(error));
    } else if (method === "PUT") {
      fetch(`https://s58-funnymisspells.onrender.com/routes/Update/${mongoId}`, {
        method: "PUT",
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then((data) => { console.log(data); })
        .catch((error) => console.log(error));
    } else {
      console.log(mongoId,"H")
      fetch(`https://s58-funnymisspells.onrender.com/routes/Delete/${mongoId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
      //   return response.json();
      // }).then(data => {
        console.log(response);
      }).catch(error => {
        console.error('There was a problem with the DELETE request:', error);
      });
    }
  };

  return (
    <div>
      <h2>{method === "POST" ? 'Add Entity' : (method === "PUT" ? 'Update Entity' : 'Delete Entity')}</h2>
      <form onSubmit={handleSubmit}>
        {method === "PUT" || method=="DELETE"?
          <div>
            <label htmlFor="imageLink">MongoDB ID:</label>
            <input
              type="text"
              id="imageLink"
              value={mongoId}
              onChange={(e) => setMongoId(e.target.value)}
              required
            />
          </div>:""
        }
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageLink">Image Link:</label>
          <input
            type="text"
            id="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
