import { Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrderHistory,
  getOrders,
} from '../../../../features/orders/orderSlice'

const HistoryPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const orderHistory = useSelector(getOrders)
  const columns = [
    { key: 'id', dataIndex: 'id', title: 'Id', width: '10%' },
    { key: 'username', dataIndex: 'username', title: 'User name' },
    {
      key: 'orderDate',
      dataIndex: 'orderDate',
      title: 'Order Date',
      width: '40%',
    },
    {
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      title: 'Total Price',
      with: '15%',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      width: '10%',
      render: (_, record) => {
        return record.status === 1 ? (
          <Tag key="actived" color="green">
            {t('actived')}
          </Tag>
        ) : record.status === -1 ? (
          <Tag key="disabled" color="red">
            {t('disabled')}
          </Tag>
        ) : record.status === 0 ? (
          <Tag key="pending" color="blue">
            {t('pending')}
          </Tag>
        ) : (
          <Tag key="delete" color="gray">
            {t('deleted')}
          </Tag>
        )
      },
    },
  ]

  useEffect(() => {
    dispatch(fetchOrderHistory(localStorage.getItem('User')))
  }, [dispatch])

  return (
    <div className="history-container" style={{ padding: '40px 50px' }}>
      <Table columns={columns} dataSource={orderHistory && orderHistory} />
    </div>
  )
}

export default HistoryPage
