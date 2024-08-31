import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    text: '',
    details: '',
    image: null,
  });
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    getImages();
  }, []);

  const onInputChange = (e) => {
    console.log('Selected File:', e.target.files[0]);
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const onInputChangeText = (e) => {
    console.log('Text Input:', e.target.value);
    setFormData({
      ...formData,
      text: e.target.value,
    });
  };

  const onInputChangeDetails = (e) => {
    console.log('Details Input:', e.target.value);
    setFormData({
      ...formData,
      details: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Form Data:', formData);

  //   const data = new FormData();
  //   data.append('text', formData.text);
  //   data.append('details', formData.details);
  //   data.append('image', formData.image);

  //   try {
  //     const result = await axios.post(
  //       'http://localhost:5000/upload-image',
  //       data,
  //       {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       }
  //     );
  //     console.log('Server Response:', result.data);
  //   } catch (error) {
  //     console.error('Error uploading data:', error);
  //   }
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // Log the form data before sending
  //   console.log('Form Data before sending:', formData);
  
  //   const data = new FormData();
  //   data.append('text', formData.text);
  //   data.append('details', formData.details);
  //   data.append('image', formData.image);
  
  //   try {
  //     const result = await axios.post(
  //       'http://localhost:5000/upload-image',
  //       data,
  //       {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       }
  //     );
  //     console.log('Server Response:', result.data);
  //   } catch (error) {
  //     console.error('Error uploading data:', error);
  
  //     // Check if the error has a response from the server
  //     if (error.response) {
  //       console.error('Server responded with status:', error.response.status);
  //       console.error('Response data:', error.response.data);
  //     }
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const data = new FormData();
    data.append('type', formData.text); // This maps the text field to the 'type' field in the schema
    data.append('details', formData.details);
    data.append('image', formData.image);

    try {
        const result = await axios.post(
            'http://localhost:5000/upload-image',
            data,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );
        console.log('Server Response:', result.data);
        setCardData((prevData) => [...prevData, formData]);
    } catch (error) {
        console.error('Error uploading data:', error);

        if (error.response) {
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
};



  // const getImage = async () => {
  //   try {
  //     const result = await axios.get('http://localhost:5000/get-image');
  //     console.log('Fetched Data:', result.data);
  //     setFormData({
  //       text: result.data.text || '',
  //       details: result.data.details || '',
  //       image: result.data.image || null,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching image:', error);
  //   }
  // };

  //// new code for Abb data loss nahi hoga reload per //////

  const getImages = async () => {
    try {
      const result = await axios.get('http://localhost:5000/get-image');
      console.log('Fetched Data:', result.data);
      setCardData(result.data.data.map((item) => ({
        text: item.type,
        details: item.details,
         image: `http://localhost:5000/uploads/${item.image}`, // Adjust path as necessary
      })));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  return (
    <div>
      <center>
        <form className='form-main' onSubmit={handleSubmit}>
          <h1>Enter Your Ad Details</h1>
          <input
            type='text'
            placeholder='Enter Property Type'
            value={formData.text}
            onChange={onInputChangeText}
          />
          <textarea
            placeholder='Enter Property Details'
            value={formData.details}
            onChange={onInputChangeDetails}
          />
          <input
            type='file'
            accept='image/*'
            onChange={onInputChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </center>
      <div className="card-container">
        {cardData.map((data, index) => (
          <div key={index} className="card">
            <h2>{data.text}</h2>
            <p>{data.details}</p>
            {data.image && (
              <img
                src={(data.image)}
                alt='Property pic'
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            )}
            {/* Add the buttons below the image */}
      <div className="card-buttons">
        <button className="buy-button">Buy</button>
        <button className="view-button">View Ad</button>
      </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
