import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Modal,
  Table,
  Tag,
  Popconfirm,
  Space,
  Select,
  Button,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  approveOrder,
  deleteOrder,
  fetchAllDetail,
  fetchOrders,
  fetchPendingOrders,
  getOrderDetails,
  getOrders,
} from '../../../features/orders/orderSlice'

const { Option } = Select

const OrderTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const orders = useSelector(getOrders)

  const [orderListStatus, setOrderListStatus] = useState('full')
  const orderDetail = useSelector(getOrderDetails)
  const [allDetail, setAllDetail] = useState([])

  const columns = [
    { key: 'id', dataIndex: 'id', title: 'Id', width: '10%' },
    { key: 'userId', dataIndex: 'userId', title: 'User Id', width: '10%' },
    {
      key: 'orderDate',
      dataIndex: 'orderDate',
      title: t('orderDate-col'),
      width: '15%',
    },
    {
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      title: t('price-col'),
      width: '15%',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: t('status-col'),
      width: '15%',
      render: (_, record) => {
        return record.status === 1 ? (
          <Tag key="approve" color="green">
            {t('approve')}
          </Tag>
        ) : record.status === -1 ? (
          <Tag key="declined" color="red">
            {t('declined')}
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
    {
      key: 'actions',
      title: 'Actions',
      width: '20%',
      render: (record) => (
        <Space size="middle">
          <Button
            size="small"
            style={{
              backgroundColor: '#b7eb8f',
              border: 'none',
              color: '#389e0d',
            }}
            onClick={() => dispatch(approveOrder({ id: record.id }))}
          >
            Approve
          </Button>
          <Popconfirm
            title="Are you sure to delete this tool?"
            onConfirm={() => dispatch(deleteOrder({ id: record.id }))}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="small"
              style={{
                backgroundColor: '#fff1f0',
                border: 'none',
                color: '#a8071a',
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,
  ]

  const handleChange = (value) => {
    setOrderListStatus(value)
  }

  useEffect(() => {
    switch (orderListStatus) {
      case 'full':
        dispatch(fetchOrders())
        break
      case 'pending':
        dispatch(fetchPendingOrders())
        break
      default:
        break
    }
    dispatch(fetchAllDetail())
  }, [dispatch, orderListStatus])

  useEffect(() => {
    orderDetail && setAllDetail(orderDetail)
  }, [orderDetail])

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>tool management</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          margin: '20px 40px 20px auto',
        }}
      >
        <Select defaultValue={orderListStatus} onChange={handleChange}>
          <Option value="full">{t('get-full-order')}</Option>
          <Option value="pending">{t('get-pending')}</Option>
        </Select>
      </div>
      <Table
        dataSource={orders && orders}
        columns={columns}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <ul>
              {allDetail.map(
                (item) =>
                  item.orderId === record.id && (
                    <li>
                      KeyId : {item.keyId} - Price : {item.price} - Discount :{' '}
                      {item.discount}
                    </li>
                  ),
              )}
            </ul>
          ),
        }}
      />
    </>
  )
}

export default OrderTable
