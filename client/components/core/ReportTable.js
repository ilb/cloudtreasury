import { Button, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Notification from '../../helpers/Notification';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

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
        dateFrom: dateFrom.format('YYYY-MM-DD'),
        dateTo: dateTo.format('YYYY-MM-DD')
      };
    }

    if (date) {
      query = {
        ...query,
        date: date.format('YYYY-MM-DD')
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

  const exportReport = (extension) => {
    try {
      onExport(buildQuery({..._params, extension}))
    } catch (err) {
      Notification.error(err.message);
    }
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
                <>
                  <Button onClick={() => exportReport('ods')} className="right ml8" type="primary" shape="round"
                          icon={<DownloadOutlined />}>
                    ODS
                  </Button>

                  <Button onClick={() => exportReport('xlsx')} className="right" type="primary" shape="round"
                          icon={<DownloadOutlined />}>
                    XLSX
                  </Button>

                </>
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