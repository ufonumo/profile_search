import React from 'react';


export const Pagination = ({profilePerPage, totalProfiles, paginate}) => {

    const pageNumbers=[];

    for(let i = 1; i <= Math.ceil(totalProfiles / profilePerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination mx-auto'>
                {pageNumbers.map(number =>(
                    <li key={number} className='page-item mx-auto'>
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
