import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    const filterContent = event.target.value
    props.filterChange(filterContent)

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}
export default connect(null,mapDispatchToProps)(Filter)