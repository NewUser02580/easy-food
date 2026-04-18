import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, searchQuery }) => {
  const { food_list } = useContext(StoreContext)

  const filtered = food_list.filter(item => {
    const matchCategory = category === "All" || category === item.category
    const matchSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header">
        <h2>Top dishes near you</h2>
        {filtered.length > 0 && (
          <span className="food-display-count">{filtered.length} dishes</span>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="food-display-list">
          <div className="no-results">
            <div className="no-results-icon">🍽️</div>
            <h3>No dishes found</h3>
            <p>Try a different keyword or category</p>
          </div>
        </div>
      ) : (
        <div className="food-display-list">
          {filtered.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodDisplay