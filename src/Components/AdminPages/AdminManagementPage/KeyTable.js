import React, { useEffect } from 'react'
import { Breadcrumb, Table, Tag, Popconfirm, Space, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {} from '../../../features/orders/orderSlice'
import { deleteKey, fetchAllKeys, getAllKeys } from '../../../features/keys/keySlice'

const KeyTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const keys = useSelector(getAllKeys)

  const columns = [
    { key: 'id', dataIndex: 'id', title: 'Id', width: '10%' },
    {
      key: 'toolId',
      dataIndex: 'toolId',
      title: 'Tool Id',
      width: '10%',
    },
    {
      key: 'toolKey',
      dataIndex: 'toolKey',
      title: 'Tool Key',
      width: '30%',
    },
    {
      key: 'machineId',
      dataIndex: 'machineId',
      title: 'Machine Id',
      width: '30%',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: t('status-col'),
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
    {
      key: 'actions',
      title: 'Actions',
      width: '10%',
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this tool?"
            onConfirm={() => dispatch(deleteKey({ id: record.id }))}
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

  useEffect(() => {
    dispatch(fetchAllKeys())
  }, [dispatch])

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>key management</Breadcrumb.Item>
      </Breadcrumb>

      <Table
        dataSource={keys && keys}
        rowKey={(record) => record.id}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p>
              Created Date : {record.createdDate} - Duration :{' '}
              {record.startDate} - {record.toDate}
            </p>
          ),
        }}
      />
    </>
  )
}

export default KeyTable
