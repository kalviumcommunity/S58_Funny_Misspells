import React, { useState } from 'react';


function Form() {
  const [id, setId] = useState('');
  const [caption, setCaption] = useState('');
  const [imageLink, setImageLink] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send the form data to the server
    // console.log('Form submitted:', { id, caption, imageLink });
    // After submitting the form, you can redirect the user to another page
    // history.push('/'); // Redirect to the home page

    let sendData={
            "id":id,
            "caption" : caption , 
            "image_link" :imageLink
        };

        console.log(sendData)

    fetch("https://s58-funnymisspells.onrender.com/routes/Create",{
        method:"POST",
        body: JSON.stringify(sendData),
        headers: {
            'Content-Type': 'application/json', 
          },
    }).then(response=> response.json())
    .then((data)=>{console.log(data);})
      .catch((error)=>console.log(error));
  };

  return (
    <div>
      <h2>Add Entity</h2>
      <form onSubmit={handleSubmit}>
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
