import React, { useContext } from 'react'
import StockNavMenu from '../../client/components/stock/StockNavMenu'
import { AwilixContext } from '../_app';
import { AutoForm } from 'uniforms'
import createSchemaBridge from '../../src/libs/uniforms-bridge.mjs';
import { DateField, ErrorsField, SubmitField } from 'uniforms-antd';
import { Card, Col, Layout, Row } from 'antd';


export default function Report() {

  const {
    /** @type {GeneratingReportSchema} */ generatingReportSchema,
  } = useContext(AwilixContext);

  return (
    <Layout>
        <Layout>
          <StockNavMenu selectedMenuItem={'report'} />
            <Layout.Content>


              <Row
                gutter={2}
                type="flex"
                justify="center"
                style={{ minHeight: '100vh', padding: '15px 0px 0px 0px' }}>
                <Col xs={24} sm={24} md={12} xxl={8}>
                  <Card title='Генерация отчёта'>
                    <AutoForm schema={createSchemaBridge(generatingReportSchema.get())} onSubmit={console.log} class="ant-form-vertical">
                      <DateField format="YYYY-MM-DD" showTime={false} name='date' /> 
                      <SubmitField value="Отправить" />
                      <ErrorsField />
                    </AutoForm>
                  </Card>
                </Col>
              </Row>



            </Layout.Content>
          </Layout>
        </Layout>



  )
}
