import Spinner from 'react-bootstrap/Spinner';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillPersonLinesFill } from "react-icons/bs"
import { BsBagFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { RiGenderlessFill } from "react-icons/ri";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiCreditCard } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { FaFirefoxBrowser } from "react-icons/fa";
import { ImListNumbered } from "react-icons/im";
import { CgBrowse } from "react-icons/cg";


export const Profiles = ({ profiles, loading, handleFilter} ) => {

    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');

    const updateSearch = e =>{
        setSearch(e.target.value);
      };
    
    const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
    };


    if(loading){
        return <Spinner animation="border" className=' text-center' role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>;
    }

    return (
        <div className='row profile'>

            <div className='col-lg-4 form_search'>
                <p className='details'>Welcome to your dashboard, kindly sort through the user base</p>
                <Form inline onSubmit={getSearch} className='search_form justify-content-center'>
                    <FormControl type="text" value={search} onChange={updateSearch} placeholder='Search for a patient' className="mr-sm-2 search_bar" />
                    <Button  type="submit" className="form_button" variant="outline-success"> <AiOutlineSearch/> </Button>
                </Form>

                <div className='category'>
                    <h6>Show Users</h6>

                    <div className='row'>
                        <button className='col-lg-3 icons' value='All' onClick={handleFilter} >
                            <BsFillPersonLinesFill/> <br></br>
                            All users
                        </button>
                        <button className='col-lg-3 icons' onClick={handleFilter}  value='"Prefer to skip"'>
                            <BsBagFill/>  <br></br>
                          Prefer to skip 
                        </button>
                        <button className='col-lg-3 icons pt-3' value='Female' onClick={handleFilter}>
                            <FaFemale/>  <br></br>
                         Female
                        </button>
                        <button className='col-lg-3 icons pt-3' value='Male' onClick={handleFilter}>
                            <FaMale/>  <br></br>
                          Male
                        </button>
                        <div className='col-lg-3  col-sm-12 text-center'>
                            <Dropdown>
                                <Dropdown.Toggle className='icons pt-3 ' id="dropdown-basic">
                                <BiCreditCard/>  <br></br>
                                    Payment Method
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleFilter}  value='"check"'>Check</Dropdown.Item>
                                    <Dropdown.Item onClick={handleFilter} value='"cc"'>CC</Dropdown.Item>
                                    <Dropdown.Item  onClick={handleFilter} value='"money order"'>Money Order</Dropdown.Item>
                                    <Dropdown.Item onClick={handleFilter} value='"paypal"'>Pay pal</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                
                        {/* <button className='col-lg-3 icons pt-3' id="dropdown-basic" value='"money order"' onClick={handleFilter}>
                            <BiCreditCard/>  <br></br>
                          Credit Card Type
                        </button> */}
                    </div>
                </div>
            </div>

            <div className='col-lg-8 results'>
                <div className="row">
                    {profiles.filter((profile) =>{
                        if(search === ''){
                            return profile
                        } else if(profile.FirstName.toLowerCase().includes(search.toLowerCase())){
                            return profile
                        }
                    }).map( profile => (

                        <div key={profile.Email} className='col-lg-4 user middle page_card'>

                            <div  key={profile.Email} className='list-group-item front'>
                                <p> <b><HiUser className="profile_icons"/></b> :  {profile.FirstName} {profile.LastName} </p>
                                <p> <RiGenderlessFill className="profile_icons"/> : {profile.Gender}</p>
                                <p className='email'>
                                     <MdEmail id='profile_email' className="profile_icons"/> :  {profile.Email}</p>
                                <p>
                                    <FaPhoneSquareAlt className="profile_icons"/> : {profile.PhoneNumber}</p>
                                <p><BiCreditCard className="profile_icons"/> : {profile.CreditCardType}</p>
                                <p> <RiSecurePaymentFill className="profile_icons"/> : {profile.PaymentMethod}</p>

                            </div>

                            <div className='back list-group-item back_content'>
                                <div className=' middle middle_content pt-4'>
                                <p> <b><ImListNumbered className="profile_icons"/></b> :  {profile.CreditCardNumber}  </p>
                                <p className='email'>
                                     <BiUserCircle  className="profile_icons"/> :  {profile.UserName}
                                </p>
                                <p> <FaFirefoxBrowser className="profile_icons"/> : {profile.DomainName}</p>
                                <p><CgBrowse className="profile_icons"/> : <a className='profile_url' href={profile.URL}> {profile.URL}</a> </p>

                                </div>
                            </div>
                        </div>

                    
                    
                    ))}
                </div>
              
            </div>


          
        </div>
    )
}
