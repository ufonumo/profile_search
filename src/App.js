import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profiles } from './components/profile';
import { Pagination } from './components/pagination';


const App = ()  => {

  const API_BASE = 'https://api.enye.tech/v1/challenge/records';


  let [profiles, setProfiles] = useState([]);
  let [loading, setloading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [profilePerPage] = useState(20);


  useEffect(()=>{
    const getProfiles = async () =>{
      setloading(true)
      const response = await fetch(API_BASE);
      let data = await response.json();
      console.log(data.records.profiles);
      setProfiles(data.records.profiles);
      setloading(false)
    }
    getProfiles();

  }, []);

  // GET CURRENT PROFILES
  const indexOfLastPost = currentPage * profilePerPage;
  const indexOfFirstPost = indexOfLastPost - profilePerPage;
  const currentProfiles = profiles.slice(indexOfFirstPost, indexOfLastPost);

  // CHANGE PAGE
  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber)
  };

  return (
    <div className="container">
      <h1 className='text-center'>Profiles</h1>

      <div >

        <Profiles profiles={currentProfiles} loading={loading}/>
        <Pagination
         profilePerPage={profilePerPage}
         totalProfiles={profiles.length}
           paginate={paginate}
         />
      </div>


    </div>
  );
}

export default App;