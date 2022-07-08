import { Layout, Menu, Breadcrumb } from 'antd'
import { useState } from 'react'
import HistoryPage from '../History/HistoryPage'
import UserInformation from '../UserInformation/UserInformation'

const { Sider, Content } = Layout

const UserInformationPage = ({ anchorTag }) => {
  const [anchor, setAnchor] = useState(!anchorTag ? 'information' : anchorTag)

  const menuItems = [
    {
      key: 'information',
      label: 'User information',
    },
    {
      key: 'history',
      label: 'Order history',
    },
  ]

  const handleChangeAnchor = (e) => {
    setAnchor(e.key)
  }

  return (
    <>
      <Layout>
        <Sider width={200}>
          <Menu
            items={menuItems}
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[anchor]}
            onClick={handleChangeAnchor}
          />
        </Sider>
        <Layout>
          <Breadcrumb
            style={{
              margin: '16px 20px',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>
              {anchor === 'information' ? 'user infomation' : 'order history'}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            {anchor === 'information' ? <UserInformation /> : <HistoryPage />}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserInformationPage
