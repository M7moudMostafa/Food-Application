import React from 'react'

const mealDetailsPage = ({ params }) => {
  return (
    <h1>meal - {params.slug}</h1>
  )
}

export default mealDetailsPage