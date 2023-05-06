import React, { useContext } from 'react'
import StockNavMenu from '../../client/components/stock/StockNavMenu'
import { AwilixContext } from '../_app';
import { AutoForm } from 'uniforms'
import createSchemaBridge from '../../src/libs/uniforms-bridge.mjs';
import { DateField, ErrorsField, SubmitField } from 'uniforms-antd';
import { Card, Col, Layout, Row } from 'antd';
import { useRouter } from 'next/router';


export default function Report() {
  const router = useRouter();
  const {
    /** @type {GeneratingReportSchema} */ generatingReportSchema,
    /** @type {ReportCalculationResource} */ reportCalculationResource
  } = useContext(AwilixContext);

  const onSubmit = async ({currentDate}) => {
    currentDate = new Date(currentDate).toISOString().slice(0, 10)
    await reportCalculationResource.getList({currentDate})

    // router.push(`/api/offers/report?currentDate=${currentDate
    //   .toISOString()
    //   .slice(0, 10)
    // }`);
  }

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
                    <AutoForm 
                      schema={createSchemaBridge(generatingReportSchema.get())} 
                      onSubmit={onSubmit} 
                      class="ant-form-vertical">
                      <DateField format="YYYY-MM-DD" showTime={false} name='currentDate' /> 
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
