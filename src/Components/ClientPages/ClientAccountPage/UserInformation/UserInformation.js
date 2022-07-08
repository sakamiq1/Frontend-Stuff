import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import {
  fetchUserInfo,
  getUserInformation,
} from '../../../../features/user/userSlice'
import { Spin, Image } from 'antd'

const UserInformation = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInformation)

  useEffect(() => {
    dispatch(fetchUserInfo(localStorage.getItem('User')))
  }, [dispatch])

  return (
    <div
      className="information-container"
      style={{
        display: 'flex',
        margin: '20px 30px',
        textAlign: 'left',
        justifyContent: 'space-around',
      }}
    >
      {userInfo ? (
        <>
          <div className="information-wrapper">
            <p>User name : {userInfo.username}</p>
            <p>Role : {userInfo.isAdmin ? 'Admin' : 'Member'}</p>
            <p>
              Full name :{' '}
              {userInfo.fullname ? userInfo.fullname : 'not yet have'}
            </p>
            <p>Email : {userInfo.email ? userInfo.email : 'not yet have'}</p>
            <p>
              Phone number : {userInfo.phone ? userInfo.phone : 'not yet have'}
            </p>
            <p>
              Status :{' '}
              {userInfo.status === 1
                ? 'Actived'
                : userInfo.status === 0
                ? 'Pending'
                : userInfo.status === -1
                ? 'Disabled'
                : 'Deleted'}
            </p>
          </div>
          <div className="user-image">
            <Image src="/Pictures/sample4.jpg" width={200} height={200} />
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  )
}

export default UserInformation
