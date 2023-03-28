import { Layout } from 'antd'

const { Content } = Layout

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '30px auto',
            padding: 24,
            minHeight: 250,
            width: 400
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
