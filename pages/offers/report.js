import React, { useContext } from 'react'
import StockNavMenu from '../../client/components/stock/StockNavMenu'
import { AwilixContext } from '../_app';
import { AutoForm } from 'uniforms'
import createSchemaBridge from '../../src/libs/uniforms-bridge.mjs';
import { DateField, ErrorsField, SubmitField } from 'uniforms-antd';
import { Card, Col, Layout, Row } from 'antd';


export default function report() {

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
                <Col span={10}>
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
