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
      setProfiles(data.records.profiles);
      console.log(data.records.profiles);
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

  const handleFilter = (e) =>{
    let filteredWord = e.target.value;

    if(filteredWord === 'All'){
      setProfiles(profiles)
        console.log(profiles);
        return profiles
        
    }
    else if(filteredWord === 'Female'){
        const filtered = profiles.filter(item => item.Gender === 'Female')
        setProfiles(filtered)
    }
    else if(filteredWord === 'Male'){
        const filtered = profiles.filter(item => item.Gender === 'Male')
        setProfiles(filtered);

    }
    else if(filteredWord === '"Prefer to skip"'){
        const filtered = profiles.filter(item => item.Gender === 'Prefer to skip')
        setProfiles(filtered);
    }
    else if(filteredWord === '"money order"'){
      const filtered = profiles.filter(item => item.PaymentMethod === 'money order')
      setProfiles(filtered);    
      console.log(filtered);  

    }
    else if(filteredWord === '"cc"'){
      const filtered = profiles.filter(item => item.PaymentMethod === 'cc')
      setProfiles(filtered); 
      console.log(filtered);  
   
    }
    else if(filteredWord === '"check"'){
      const filtered = profiles.filter(item => item.PaymentMethod === 'check')
      setProfiles(filtered);  
      console.log(filtered);  
    }
    else if(filteredWord === '"paypal"'){
      const filtered = profiles.filter(item => item.PaymentMethod === 'paypal')
      setProfiles(filtered); 
      console.log(filtered);  
    }
};

  return (
    <div className="container-fluid">
      <h1 className='text-center'>Profiles</h1>

      <div >

        <Profiles profiles={currentProfiles} loading={loading} handleFilter={handleFilter}/>
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
