import React from 'react'
import Part from './Part'

function Content(props) {
    return (
        <div>
            <p>
                <Part part={props.course.parts[0].name} exercise={props.course.parts[0].exercises} />
            </p>
            <p>
                <Part part={props.course.parts[1].name} exercise={props.course.parts[1].exercises} />
            </p>
            <p>
                <Part part={props.course.parts[2].name} exercise={props.course.parts[2].exercises} />
            </p>
        </div>
    )
}

export default Content
