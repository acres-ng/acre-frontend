import React from 'react'
import UsersTable from './UsersTable'
import { usersData } from './users-data'

const InventoryList = () => {
  return (
    <div>
    <UsersTable data={usersData} />
  </div>
  )
}

export default InventoryList