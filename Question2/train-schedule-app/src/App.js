
import React, { useState, useEffect } from 'react';
import { registerCompany, getAuthorizationToken, getAllTrains } from './api';

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    registerCompany({
      companyName: 'Train Central',
      ownerName: 'Ram',
      rollNo: '1',
      ownerEmail: 'ram@abc.edu',
      accessCode: 'FKDLjg',
    })
      .then((companyData) => {
        return getAuthorizationToken({
          companyName: companyData.companyName,
          clientID: companyData.clientID,
          ownerName: companyData.ownerName,
          ownerEmail: companyData.ownerEmail,
          rollNo: companyData.rollNo,
          clientSecret: companyData.clientSecret,
        });
      })
      .then((accessToken) => {
        return getAllTrains(accessToken);
      })
      .then((trainData) => {
        setTrains(trainData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);



  return (
    <div className="App">
    </div>
  );
}

export default App;
