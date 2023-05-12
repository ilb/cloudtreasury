import { Button, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Notification from '../../helpers/Notification';
import { DownloadOutlined } from '@ant-design/icons';

const ReportTable = ({
   title,
   filters,
   columns,
   params,
   onChangeParams,
   onExport,
   withDateRange = false,
   withDate = false,
   ...tableParams
 }) => {
  const withExport = !!onExport;
  const withFilters = !!filters || withDateRange || withDate;

  const [tableData, setTableData] = useState([]);
  const [_params, setParams] = useState(params);

  useEffect(() => {
    refreshData(buildQuery(_params));
  }, [_params]);

  const buildQuery = (params) => {
    let { dateRange, date, ...query } = params;
    if (dateRange?.length === 2) {
      const [dateFrom, dateTo] = dateRange;
      query = {
        ...query,
        dateFrom: dateFrom.format('DD.MM.YYYY'),
        dateTo: dateTo.format('DD.MM.YYYY')
      };
    }

    if (date) {
      query = {
        ...query,
        date: date.format('DD.MM.YYYY')
      };
    }

    return query;
  };

  const refreshData = async (params) => {
    onChangeParams(params).then(setData).catch(handleError);
  };

  const setData = (data) => {
    setTableData(data.rows);
  };

  const handleError = (err) => {
    Notification.error(err.message);
  };

  const submitFilters = (model) => {
    setParams(model);
  };

  const exportReport = () => {
    onExport(buildQuery(_params)).then(console.log).catch(handleError);
  };

  return (
    <>
      {title && (
        <>
          <Typography.Title level={4}>
            <span>
              {title}
            </span>
            <span className="right">
              {withExport && (
                <Button onClick={exportReport} className="right" type="primary" shape="circle"
                        icon={<DownloadOutlined />} />
              )}
            </span>
          </Typography.Title>
          <Divider className="my16" />
        </>
      )}
      <>
        <Row className="my16">
          <Col span={24}>
            {withFilters && (
              <>
                <Form
                  initialValues={params}
                  name="reportTableForm"
                  onValuesChange={submitFilters}
                >
                  {withDateRange && (
                    <>
                      <Form.Item name="dateRange" label="Дата">
                        <DatePicker.RangePicker format="DD.MM.YYYY" />
                      </Form.Item>
                    </>
                  )}
                  {withDate && (
                    <>
                      <Form.Item name="date" label="Дата">
                        <DatePicker format="DD.MM.YYYY" />
                      </Form.Item>
                    </>
                  )}
                  {filters}
                </Form>
              </>
            )}
          </Col>
        </Row>
      </>
      <Table columns={columns} dataSource={tableData} {...tableParams} />
    </>
  );
};

export default ReportTable;