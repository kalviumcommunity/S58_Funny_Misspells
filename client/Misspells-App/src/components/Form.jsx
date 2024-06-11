import React, { useState } from 'react';
import './form.css'; // Import the CSS file

function Form({ method }) {
  const [id, setId] = useState('');
  const [mongoId, setMongoId] = useState('');
  const [caption, setCaption] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    let sendData = {
      Id: id,
      caption: caption,
      URL: imageLink
    };

    if (method === "POST") {
      const cookieToken = document.cookie.split(";").find(row => row.startsWith("Token=")).split("=")[1];
      fetch("http://localhost:1330/postdata", {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
          "Authorization": cookieToken
        },
      }).then(response => response.json())
        .then((data) => { console.log(data); })
        .catch((error) => console.log(error));
    } else if (method === "PUT") {
      fetch(`http://localhost:1330/routes/Update/${mongoId}`, {
        method: "PUT",
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then((data) => { console.log(data); })
        .catch((error) => console.log(error));
    } else {
      console.log(mongoId, "H")
      fetch(`http://localhost:1330/routes/Delete/${mongoId}`, {
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
    <div className="form-container">
      <h2 className="form-title">{method === "POST" ? 'Add Entity' : (method === "PUT" ? 'Update Entity' : 'Delete Entity')}</h2>
      <form onSubmit={handleSubmit}>
        {method === "PUT" || method === "DELETE" ?
          <div className="form-group">
            <label className="form-label" htmlFor="imageLink">MongoDB ID:</label>
            <input
              className="form-input"
              type="text"
              id="imageLink"
              value={mongoId}
              onChange={(e) => setMongoId(e.target.value)}
              required
            />
          </div> : ""
        }
        <div className="form-group">
          <label className="form-label" htmlFor="id">ID:</label>
          <input
            className="form-input"
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="caption">Caption:</label>
          <input
            className="form-input"
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="imageLink">Image Link:</label>
          <input
            className="form-input"
            type="text"
            id="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
          />
        </div>
        <button className="form-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
  