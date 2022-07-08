import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ToolTable from './ToolTable'
import OrderTable from './OrderTable'
import { t } from 'i18next'
import KeyTable from './KeyTable'

const { Sider, Content } = Layout

const AdminManagePage = () => {
  const [anchor, setAnchor] = useState('tool')
  const isAdmin = localStorage.getItem('Role') === 'admin'
  const navigate = useNavigate()

  const menuItems = [
    {
      key: 'list-tools',
      label: (
        <a onClick={() => setAnchor('tool')} className="navbar-link">
          {t('list-tool')}
        </a>
      ),
    },
    {
      key: 'list-keys',
      label: (
        <a onClick={() => setAnchor('key')} className="navbar-link">
          {t('list-key')}
        </a>
      ),
    },
    {
      key: 'list-users',
      label: (
        <a onClick={() => setAnchor('user')} className="navbar-link">
          {t('list-user')}
        </a>
      ),
    },
    {
      key: 'list-orders',
      label: (
        <a onClick={() => setAnchor('order')} className="navbar-link">
          {t('list-order')}
        </a>
      ),
    },
  ]

  useEffect(() => {
    !isAdmin && navigate('/404')
  }, [isAdmin, navigate])

  return (
    <>
      <Layout>
        <Sider width={200} style={{ minHeight: '75vh' }}>
          <Menu items={menuItems} mode="inline" theme="dark" />
        </Sider>
        <Layout>
          <Content
            style={{
              backgroundColor: '#fff',
              margin: '20px 20px auto',
              padding: '0 50px',
            }}
          >
            {anchor === 'tool' ? (
              <ToolTable />
            ) : anchor === 'order' ? (
              <OrderTable />
            ) : anchor === 'key' ? (
              <KeyTable />
            ) : (
              'Not found'
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default AdminManagePage
