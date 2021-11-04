import React from 'react'

function Filter({value,onChange}) {
    return (
        <div>
            <strong>Filter Shown with : </strong><input value={value} onChange={onChange}/>
        </div>
    )
}

export default Filter
