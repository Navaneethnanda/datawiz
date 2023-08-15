import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Layout, Table } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';
import TopHeader from '../../shared/top-header/top-header';
import Chart from '../../shared/Chart/chart';
import Loader from '../../shared/loader/Loader';

const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const EditVisulization = () => {
  const history = useHistory();
  const location = useLocation();
  const { userId } = useSelector(state => state.auth.user);

  const fields = {
    userId: userId.toString(),
    link: true,
  };
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [xAxis, setXAxis] = useState([]);
  const [allData, setAllData] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [allSchemaOptions, setAllSchemaOptions] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [columnXOptions, setColumnXOptions] = useState([]);
  const [columnYOptions, setColumnYOptions] = useState([]);
  const [allColumnXOptions, setAllColumnXOptions] = useState([]);
  const [allColumnYOptions, setAllColumnYOptions] = useState([]);
  const graphTypeOption = [
    {
      id: 1,
      label: 'Bar',
      value: 'bar',
    },
    {
      id: 2,
      label: 'Pie',
      value: 'pie',
    },
    {
      id: 3,
      label: 'Line',
      value: 'line',
    },
  ];
  const dataTypeOptions = [
    {
      id: 1,
      label: 'Count',
      value: 'COUNT',
    },
    {
      id: 2,
      label: 'Average',
      value: 'AVG',
    },
    {
      id: 3,
      label: 'Sum',
      value: 'SUM',
    },
  ];
  const [selectedGraphType, setSelectedGraphType] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState(null);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [selectedXTable, setSelectedXTable] = useState(null);
  const [selectedYTable, setSelectedYTable] = useState(null);
  const [xColumn, setXColumn] = useState(null);
  const [yColumn, setYColumn] = useState(null);
  const [name, setName] = useState(null);
  const visuializationID = window.location.pathname.split('/')[4];
  const payloadObject = {
    connectionId: window.location.pathname.split('/')[3],
    schema: null,
    table: null,
  };

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const createSelectObject = (res, keyword, column = null, selectedColum = null) => {
    const optionData = [];

    res?.data?.data.map((e, index) =>
      optionData.push({
        id: index,
        label: e,
        value: e,
      })
    );

    if (keyword === 'table') setTableOptions(optionData);
    if (keyword === 'column') {
      if (column === 'x') {
        setAllColumnXOptions(optionData);
        setColumnXOptions(
          optionData.filter(e => (e.value !== selectedColum ? selectedColum : yColumn))
        );
      } else {
        setAllColumnYOptions(optionData);
        setColumnYOptions(
          optionData.filter(e => (e.value !== selectedColum ? selectedColum : xColumn))
        );
      }
    }
  };

  const handleCreateGraph = async data => {
    try {
      await api(true).editGraph(data);

      history.push(`/visualization/${payloadObject.connectionId}`, {
        name: location.state.name,
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const handleCustomTableData = (x, y) => {
    const tempData = [];

    // eslint-disable-next-line array-callback-return
    x.map((e, index) => {
      tempData.push({
        xData: e,
        yData: y[index],
      });
    });

    setAllData(tempData);
  };

  const handlePreviewGraph = async data => {
    try {
      const res = await api(true).previewGraph(data);
      setXAxis(res?.data?.data?.x);
      setYAxis(res?.data?.data?.y);
      handleCustomTableData(res?.data?.data?.x, res?.data?.data?.y);
    } catch (e) {
      // console.log(e);
    }
  };

  const handleDelete = async data => {
    try {
      await api(true).deleteGraph(data);

      history.push(`/visualization/${payloadObject.connectionId}`, {
        name: location.state.name,
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const submit = async (e, type) => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        const data = {};

        data.connectionId = parseInt(payloadObject.connectionId, 10);
        if (type === 'create') {
          data.visualizationId = visuializationID;
          data.userId = parseInt(fields.userId, 10);
          data.name = name;
          data.chartType = selectedGraphType;
          data.schemaName = selectedDatabase;
          data.xTable = selectedXTable;
          data.xAttribute = xColumn;
          data.yTable = selectedYTable;
          data.yAttribute = yColumn;
        } else {
          data.schemaName = selectedDatabase;
          data.tableNameOne = selectedXTable;
          data.tableNameTwo = selectedYTable;
          data.xColumn = xColumn;
          data.yColumn = yColumn;
        }
        data.calculation = selectedDataType;

        if (type === 'create') await handleCreateGraph(data);
        else if (type === 'delete') await handleDelete(visuializationID);
        else await handlePreviewGraph(data);
        setIsSubmitLoading(false);
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
      setIsSubmitLoading(false);
      setErrors(validator.getErrorMessages());
      showValidationMessage(true);
    }
  };

  const getAllTables = async value => {
    setSelectedDatabase(value);
    setSelectedXTable(null);
    setSelectedYTable(null);
    setXAxis([]);
    setYAxis([]);
    setXColumn(null);
    setYColumn(null);
    setAllData([]);

    try {
      const data = payloadObject;

      data.schema = value;

      const res = await api().getTables(data);

      createSelectObject(res, 'table');
    } catch (e) {
      // console.log(e);
    }
  };

  const getAllColumns = async (value, column, selectedColumn = null) => {
    setAllData([]);
    if (column === 'x') {
      setSelectedXTable(value);
      setXColumn(null);
      setXAxis([]);
      setYAxis([]);
    } else {
      setSelectedYTable(value);
      setYColumn(null);
      setXAxis([]);
      setYAxis([]);
    }

    try {
      const data = payloadObject;
      let res = null;

      data.table = value;

      if (column === 'x') res = await api().getColumns(data);
      else res = await api().getYColumns(data);

      createSelectObject(res, 'column', column, selectedColumn);
    } catch (e) {
      // console.log(e);
    }
  };

  const getData = async () => {
    try {
      const res = await api().getDatabases(payloadObject);

      const data = [];

      // eslint-disable-next-line array-callback-return
      res?.data?.data.map((e, index) => {
        data.push({
          id: index,
          label: e,
          value: e,
        });
      });

      setAllSchemaOptions(data);
    } catch (e) {
      // console.log(e);
    }
  };

  const getGraphData = async () => {
    setLoading(true);
    try {
      const res = await api().getGraphDataByID(visuializationID);

      await getAllTables(res?.data?.data?.schema);
      await getAllColumns(res?.data?.data?.tableOne, 'x', res?.data?.data?.columnY);
      await getAllColumns(res?.data?.data?.tableTwo, 'y', res?.data?.data?.columnX);
      setName(res?.data?.data?.name);
      setXColumn(res?.data?.data?.columnX);
      setYColumn(res?.data?.data?.columnY);
      setSelectedGraphType(res?.data?.data?.graphType);
      setSelectedDataType(res?.data?.data?.calculation);
      setXAxis(res?.data?.data?.x);
      setYAxis(res?.data?.data?.y);
      handleCustomTableData(res?.data?.data?.x, res?.data?.data?.y);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'X Column',
      dataIndex: ['xData'],
    },
    {
      title: 'Y Column',
      dataIndex: ['yData'],
    },
  ];

  useEffect(() => {
    getData();
    getGraphData();
  }, []);

  return (
    <Layout>
      <TopHeader title="Edit Dashboard" link={fields?.link} name={location.state.name} />
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Content>
            <div>
              <div className="site-layout-background">
                <div className="top-boxes full-width">
                  <FormMain className="global-form full-width add-graph-form">
                    <div className="full-width form-field">
                      <div className="label">Name</div>
                      <Input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ width: '50%' }}
                        classname={errors?.name ? 'invalid' : ''}
                      />
                      {validator.message(`Name`, name, `required`)}
                    </div>

                    <div className="full-width form-field">
                      <div className="label">Select Scheme</div>
                      <Select
                        showSearch
                        style={{
                          backgroundColor: '#fff',
                          width: 200,
                        }}
                        value={selectedDatabase}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          getAllTables(newValue);
                        }}
                        options={allSchemaOptions}
                        classname={errors?.name ? 'invalid' : ''}
                      />
                      {validator.message(`Scheme`, selectedDatabase, `required`)}
                    </div>

                    <div className="full-width form-field">
                      <div className="label">Select Graph Type</div>
                      <Select
                        style={{
                          width: 200,
                        }}
                        value={selectedGraphType}
                        placeholder="Select Graph Type"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          setSelectedGraphType(newValue);
                          setXAxis([]);
                          setYAxis([]);
                          setAllData([]);
                        }}
                        options={graphTypeOption}
                        classname={errors?.selectedGraphType ? 'invalid' : ''}
                      />
                      {validator.message(`Type`, selectedGraphType, `required`)}
                    </div>

                    <div className="full-width form-field">
                      <div className="label">Select Data Type</div>
                      <Select
                        style={{
                          width: 200,
                        }}
                        value={selectedDataType}
                        placeholder="Select Data Type"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          setSelectedDataType(newValue);
                          setXAxis([]);
                          setYAxis([]);
                          setAllData([]);
                        }}
                        options={dataTypeOptions}
                        classname={errors?.selectedDataType ? 'invalid' : ''}
                      />
                      {validator.message(`Type`, selectedDataType, `required`)}
                    </div>
                  </FormMain>

                  <FormMain className="global-form full-width add-graph-form">
                    <div className="full-width form-field">
                      <div className="label">Select X Table</div>
                      <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        value={selectedXTable}
                        disabled={selectedDatabase == null}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          getAllColumns(newValue, 'x');
                        }}
                        options={tableOptions}
                        classname={errors?.selectedXTable ? 'invalid' : ''}
                      />
                      {validator.message(`Table`, selectedXTable, `required`)}
                    </div>

                    <div className="full-width form-field">
                      <div className="label">Select X Column</div>
                      <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        value={xColumn}
                        disabled={selectedXTable == null}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          setXAxis([]);
                          setYAxis([]);
                          setXColumn(newValue);
                          setAllData([]);
                          setColumnYOptions(allColumnYOptions.filter(e => e.value !== newValue));
                        }}
                        options={columnXOptions}
                        classname={errors?.xColumn ? 'invalid' : ''}
                      />
                      {validator.message(`XColumn`, xColumn, `required`)}
                    </div>

                    <div className="full-width form-field">
                      <div className="label">Select Y Table</div>
                      <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        value={selectedYTable}
                        disabled={selectedDatabase == null}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          getAllColumns(newValue, 'y');
                        }}
                        options={tableOptions}
                        classname={errors?.selectedYTable ? 'invalid' : ''}
                      />
                      {validator.message(`Table`, selectedYTable, `required`)}
                    </div>

                    <div className="full-width form-field">
                      <div className="label">Select Y Column</div>
                      <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        value={yColumn}
                        disabled={selectedYTable == null}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={newValue => {
                          setXAxis([]);
                          setYAxis([]);
                          setYColumn(newValue);
                          setAllData([]);
                          setColumnXOptions(allColumnXOptions.filter(e => e.value !== newValue));
                        }}
                        options={columnYOptions}
                        classname={errors?.yColumn ? 'invalid' : ''}
                      />
                      {validator.message(`YColumn`, yColumn, `required`)}
                    </div>
                  </FormMain>

                  <FormMain className="global-form full-width add-graph-form">
                    <div className="full-width form-field flex-center mb-0">
                      <Button
                        type="primary"
                        className="submit-btn"
                        onClick={e => submit(e, 'preview')}
                        loading={isSubmitLoading}
                      >
                        <span>Preview Graph</span>
                      </Button>
                    </div>

                    <div className="full-width form-field flex-center mb-0">
                      <Button
                        type="primary"
                        className="submit-btn"
                        onClick={e => submit(e, 'create')}
                        loading={isSubmitLoading}
                      >
                        <span>Edit Graph</span>
                      </Button>
                    </div>

                    <div className="full-width form-field flex-center mb-0">
                      <Button
                        type="primary"
                        className="submit-btn"
                        onClick={e => submit(e, 'delete')}
                        loading={isSubmitLoading}
                      >
                        <span>Delete Graph</span>
                      </Button>
                    </div>
                  </FormMain>
                </div>
              </div>
              <div className="site-layout-background">
                <div className="top-boxes full-width" style={{ top: '20px' }}>
                  {xAxis.length > 0 && yAxis.length > 0 && (
                    <span className="chart" style={{ width: '80%', height: '80%' }}>
                      <Chart
                        xaxis={xAxis}
                        yaxis={yAxis}
                        type={selectedGraphType}
                        isCustomCss={false}
                      />
                    </span>
                  )}
                </div>
                <div className="full-width default-table mt-20">
                  <Table columns={columns} dataSource={allData} pagination={false} />
                </div>
              </div>
            </div>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default EditVisulization;
