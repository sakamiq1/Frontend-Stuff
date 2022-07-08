import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Breadcrumb,
  Button,
  Checkbox,
  Modal,
  Radio,
  Space,
  Typography,
  Spin,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDetailAsync,
  getDetail,
  removeSelectedTools,
} from '../../../features/details/detailSlice'
import './ProductDetail.scss'
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  addNewOrder,
  getOrderStatus,
} from '../../../features/orders/orderSlice'

const { Text } = Typography

const Product = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const toolDetail = useSelector(getDetail)
  const [detail, setDetail] = useState({})
  const [period, setPeriod] = useState(1)
  const [visible, setVisible] = useState(false)
  const [orderStatus, setOrderStatus] = useState('idle')
  const buyStatus = useSelector(getOrderStatus)
  const dispatch = useDispatch()
  let param = useParams()

  const handleCancel = () => {
    setVisible(false)
  }

  const handleOk = () => {
    if (orderStatus === 'success') {
      setOrderStatus('idle')
      setVisible(false)
    } else {
      dispatch(
        addNewOrder({
          Username: localStorage.getItem('User'),
          Tools: [
            {
              ToolId: Number(param.toolId),
              NumberOfKeys: period,
              Discount: 0,
              MachineId: 'cc00f1dc-fceb-42e0-8217-3ee6e4b73ab9',
            },
          ],
        }),
      )
      setOrderStatus('pending')
    }
  }

  const handleBuy = () => {
    localStorage.getItem('User') ? setVisible(true) : navigate('/login')
  }

  useEffect(() => {
    if (param.toolId && param.toolId !== '') {
      dispatch(fetchDetailAsync(param.toolId))
    }
    return () => {
      dispatch(removeSelectedTools())
    }
  }, [dispatch, param.toolId])

  useEffect(() => {
    setDetail(toolDetail.resultItem)
  }, [toolDetail])

  useEffect(() => {
    buyStatus && setOrderStatus(buyStatus.isSuccess ? 'success' : 'failed')
  }, [buyStatus])

  return (
    <div className="product-detail-div">
      {detail ? (
        <>
          <div className="product-img">
            <img src={detail.image} alt={detail.name} />
          </div>
          <div className="product-detail">
            <Breadcrumb>
              <Breadcrumb.Item>
                <span className="breadcrumb-detail">Tools</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="breadcrumb-detail">{detail.name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="product-detail-wrapper">
              <div className="detail-title">
                <h1 id="detail-title">{detail.name}</h1>
                <div className="detail-price">
                  <h3>
                    {detail.price
                      ? detail.price
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                          .replace('.00', '')
                      : '0000.00'}{' '}
                    VND
                  </h3>
                  <span id="separator">|</span>
                  <h3 id="detail-status">
                    {detail.status === 1
                      ? t('actived')
                      : detail.status === -1
                      ? t('disabled')
                      : detail.status === 0
                      ? 'pending'
                      : t('deleted')}
                  </h3>
                </div>
              </div>
              <div className="detail-description">
                <p id="description">{detail.description}</p>
              </div>
              <div className="detail-function-wrapper">
                <Radio.Group
                  optionType="button"
                  onChange={(e) => setPeriod(e.target.value)}
                  value={period}
                >
                  <Space size="small">
                    <Radio value={1}>{t('1month')}</Radio>
                    <Radio value={2}>{t('2month')} </Radio>
                    <Radio value={3}>{t('3month')}</Radio>
                  </Space>
                </Radio.Group>
                <Checkbox id="shipping-check">{t('shipping-check')}</Checkbox>
                <Button id="buy-button" onClick={handleBuy}>
                  {t('buynow')}
                </Button>
              </div>
              <div className="detail-share-product">
                <a href="https://www.facebook.com/">
                  <FacebookOutlined />
                </a>
                <a href="https://www.google.com/">
                  <GoogleOutlined />
                </a>
                <a href="https://twitter.com/home?lang=vi">
                  <TwitterOutlined />
                </a>
              </div>
            </div>
          </div>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
            {orderStatus === 'idle' ? (
              <>
                <Text type="success">{t('your-order')}</Text>
                <p>{detail.name}</p>
                <p>{detail.code}</p>
                <p>{detail.description}</p>
                <p>{detail.price}</p>
              </>
            ) : orderStatus === 'success' ? (
              t('submited-order')
            ) : orderStatus === 'failed' ? (
              'Order failed'
            ) : (
              <Spin />
            )}
          </Modal>
        </>
      ) : (
        <Spin />
      )}
    </div>
  )
}

export default Product
