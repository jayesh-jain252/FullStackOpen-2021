import React from 'react';
import Part from './Part';

function Content({course}) {
    
    return(
            <div>
            {course.parts.map((x) => 
            
                    <Part key={x.id} part={x}/>
                
            )}
            </div>
            
    )       
}

export default Content

{/* <Part part={course.parts[0]} />
            <Part part={course.parts[1]} />
            <Part part={course.parts[2]} />
            <Part part={course.parts[3]} /> */}