import React, { useState, useEffect } from 'react';
import { Button, Input, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ScrollAnimation from 'react-animate-on-scroll';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';
import TopHeader from '../../shared/top-header/top-header';
import SelectGraph from './selectGraph';
import Charts from '../../shared/Chart/chart';
import Loader from '../../shared/loader/Loader';

const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const AddVisulization = () => {
  const location = useLocation();
  const { userId } = useSelector(state => state.auth.user);

  const fields = {
    userId: userId.toString(),
    link: false,
  };
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [addModel, setAddModel] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [allGraphData, setAllGraphData] = useState({
    visualOneId: null,
    visualTwoId: null,
    visualThreeId: null,
    visualFourId: null,
  });
  const [currentKey, setCurrentKey] = useState(null);
  const payloadObject = {
    dashboardId: window.location.pathname.split('/')[2],
  };

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const handleModel = (bool, key) => {
    setAddModel(bool);
    setCurrentKey(key);
  };

  const setGraphData = (length, res) => {
    if (length === 0) {
      setAllGraphData(prev => ({
        ...prev,
        visualOneId: {
          graphId: res?.data?.data?.values[0].visualizationId,
          allData: {
            name: res?.data?.data?.values[0].name,
            graphType: res?.data?.data?.values[0].graphType,
            x: res?.data?.data?.values[0].x,
            y: res?.data?.data?.values[0].y,
          },
        },
      }));
    } else if (length === 1) {
      setAllGraphData(prev => ({
        ...prev,
        visualOneId: {
          graphId: res?.data?.data?.values[0].visualizationId,
          allData: {
            name: res?.data?.data?.values[0].name,
            graphType: res?.data?.data?.values[0].graphType,
            x: res?.data?.data?.values[0].x,
            y: res?.data?.data?.values[0].y,
          },
        },
        visualTwoId: {
          graphId: res?.data?.data?.values[1].visualizationId,
          allData: {
            name: res?.data?.data?.values[1].name,
            graphType: res?.data?.data?.values[1].graphType,
            x: res?.data?.data?.values[1].x,
            y: res?.data?.data?.values[1].y,
          },
        },
      }));
    } else if (length === 2) {
      setAllGraphData(prev => ({
        ...prev,
        visualOneId: {
          graphId: res?.data?.data?.values[0].visualizationId,
          allData: {
            name: res?.data?.data?.values[0].name,
            graphType: res?.data?.data?.values[0].graphType,
            x: res?.data?.data?.values[0].x,
            y: res?.data?.data?.values[0].y,
          },
        },
        visualTwoId: {
          graphId: res?.data?.data?.values[1].visualizationId,
          allData: {
            name: res?.data?.data?.values[1].name,
            graphType: res?.data?.data?.values[1].graphType,
            x: res?.data?.data?.values[1].x,
            y: res?.data?.data?.values[1].y,
          },
        },
        visualThreeId: {
          graphId: res?.data?.data?.values[2].visualizationId,
          allData: {
            name: res?.data?.data?.values[2].name,
            graphType: res?.data?.data?.values[2].graphType,
            x: res?.data?.data?.values[2].x,
            y: res?.data?.data?.values[2].y,
          },
        },
      }));
    } else if (length === 3) {
      setAllGraphData(prev => ({
        ...prev,
        visualOneId: {
          graphId: res?.data?.data?.values[0].visualizationId,
          allData: {
            name: res?.data?.data?.values[0].name,
            graphType: res?.data?.data?.values[0].graphType,
            x: res?.data?.data?.values[0].x,
            y: res?.data?.data?.values[0].y,
          },
        },
        visualTwoId: {
          graphId: res?.data?.data?.values[1].visualizationId,
          allData: {
            name: res?.data?.data?.values[1].name,
            graphType: res?.data?.data?.values[1].graphType,
            x: res?.data?.data?.values[1].x,
            y: res?.data?.data?.values[1].y,
          },
        },
        visualThreeId: {
          graphId: res?.data?.data?.values[2].visualizationId,
          allData: {
            name: res?.data?.data?.values[2].name,
            graphType: res?.data?.data?.values[2].graphType,
            x: res?.data?.data?.values[2].x,
            y: res?.data?.data?.values[2].y,
          },
        },
        visualFourId: {
          graphId: res?.data?.data?.values[3].visualizationId,
          allData: {
            name: res?.data?.data?.values[3].name,
            graphType: res?.data?.data?.values[3].graphType,
            x: res?.data?.data?.values[3].x,
            y: res?.data?.data?.values[3].y,
          },
        },
      }));
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setAllGraphData({
        visualOneId: null,
        visualTwoId: null,
        visualThreeId: null,
        visualFourId: null,
      });
      const res = await api().getCustomDashboardByID(payloadObject.dashboardId);

      const length = res?.data?.data?.values.length - 1;

      setGraphData(length, res);

      setName(res?.data?.data?.name);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleRemove = key => {
    setAllGraphData(prev => ({
      ...prev,
      [key]: null,
    }));
  };

  const getGraphData = async (graphId, key) => {
    try {
      const res = await api().getGraphDataByID(graphId);

      setAllGraphData(pre => ({
        ...pre,
        [key]: { graphId, allData: res?.data?.data },
      }));
    } catch (e) {
      // console.log(e);
    }
  };

  const submit = async () => {
    try {
      setIsSubmitLoading(true);

      if (validator.allValid()) {
        const bodyData = {
          dashboardId: location?.state?.data?.dashboardId,
          userId,
          name: location?.state?.data?.name,
          visualOneId: allGraphData?.visualOneId?.graphId,
          visualTwoId: allGraphData?.visualTwoId?.graphId,
          visualThreeId: allGraphData?.visualThreeId?.graphId,
          visualFourId: allGraphData?.visualFourId?.graphId,
        };

        await api(true).saveCustomDashboard(bodyData);

        setIsSubmitLoading(false);
      } else {
        setIsSubmitLoading(false);
        setErrors(validator.getErrorMessages());
        showValidationMessage(true);
      }
    } catch (e) {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <TopHeader
            title={location.state.data.name}
            link={fields?.link}
            name={location.state.data.name}
          />
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

                    <div className="full-width form-field flex-center mb-0">
                      <Button
                        type="primary"
                        className="submit-btn"
                        onClick={e => submit(e, 'create')}
                        loading={isSubmitLoading}
                      >
                        <span>Save</span>
                      </Button>
                      <Button
                        type="primary"
                        className="submit-btn"
                        onClick={getData}
                        loading={isSubmitLoading}
                      >
                        <span>Refresh</span>
                      </Button>
                    </div>
                  </FormMain>
                </div>
              </div>

              <div className="site-layout-background">
                <div className="top-boxes full-width">
                  <ScrollAnimation
                    animateOnce
                    className="full-width single-box graph-box"
                    animateIn="fadeInUp"
                    style={{ width: allGraphData?.visualOneId ? 'auto' : '40%', padding: '60px' }}
                  >
                    <div
                      className="full-width"
                      key="visualOneId"
                      role="presentation"
                      onClick={() => handleModel(true, 'visualOneId')}
                    >
                      {allGraphData?.visualOneId ? (
                        <React.Fragment>
                          <div className="earning-text full-width">
                            {allGraphData?.visualOneId?.allData?.name}
                          </div>
                          <div>
                            <Charts
                              xaxis={allGraphData?.visualOneId?.allData?.x}
                              yaxis={allGraphData?.visualOneId?.allData?.y}
                              type={allGraphData?.visualOneId?.allData?.graphType}
                              isCustomCss
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div>
                          <PlusOutlined className="plus-icon" />
                        </div>
                      )}
                    </div>
                    {allGraphData?.visualOneId && (
                      <DeleteOutlined
                        style={{ float: 'right', position: 'absolute' }}
                        onClick={() => handleRemove('visualOneId')}
                      />
                    )}
                  </ScrollAnimation>

                  <ScrollAnimation
                    animateOnce
                    className="full-width single-box graph-box"
                    animateIn="fadeInUp"
                    style={{ width: allGraphData?.visualTwoId ? 'auto' : '40%', padding: '60px' }}
                  >
                    <div
                      className="full-width"
                      key="visualTwoId"
                      role="presentation"
                      onClick={() => handleModel(true, 'visualTwoId')}
                    >
                      {allGraphData?.visualTwoId ? (
                        <React.Fragment>
                          <div className="earning-text full-width">
                            {allGraphData?.visualTwoId?.allData?.name}
                          </div>
                          <div>
                            <Charts
                              xaxis={allGraphData?.visualTwoId?.allData?.x}
                              yaxis={allGraphData?.visualTwoId?.allData?.y}
                              type={allGraphData?.visualTwoId?.allData?.graphType}
                              isCustomCss
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div>
                          <PlusOutlined className="plus-icon" />
                        </div>
                      )}
                    </div>
                    {allGraphData?.visualTwoId && (
                      <DeleteOutlined
                        style={{ float: 'right', position: 'absolute' }}
                        onClick={() => handleRemove('visualTwoId')}
                      />
                    )}
                  </ScrollAnimation>
                </div>
              </div>

              <div className="site-layout-background">
                <div className="top-boxes full-width">
                  <ScrollAnimation
                    animateOnce
                    className="full-width single-box graph-box"
                    animateIn="fadeInUp"
                    style={{ width: allGraphData?.visualThreeId ? 'auto' : '40%', padding: '60px' }}
                  >
                    <div
                      className="full-width"
                      key="visualThreeId"
                      role="presentation"
                      onClick={() => handleModel(true, 'visualThreeId')}
                    >
                      {allGraphData?.visualThreeId ? (
                        <React.Fragment>
                          <div className="earning-text full-width">
                            {allGraphData?.visualThreeId?.allData?.name}
                          </div>
                          <div>
                            <Charts
                              xaxis={allGraphData?.visualThreeId?.allData?.x}
                              yaxis={allGraphData?.visualThreeId?.allData?.y}
                              type={allGraphData?.visualThreeId?.allData?.graphType}
                              isCustomCss
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div>
                          <PlusOutlined className="plus-icon" />
                        </div>
                      )}
                    </div>
                    {allGraphData?.visualThreeId && (
                      <DeleteOutlined
                        style={{ float: 'right', position: 'absolute' }}
                        onClick={() => handleRemove('visualThreeId')}
                      />
                    )}
                  </ScrollAnimation>

                  <ScrollAnimation
                    animateOnce
                    className="full-width single-box graph-box"
                    animateIn="fadeInUp"
                    style={{ width: allGraphData?.visualFourId ? 'auto' : '40%', padding: '60px' }}
                  >
                    <div
                      className="full-width"
                      key="visualFourId"
                      role="presentation"
                      onClick={() => handleModel(true, 'visualFourId')}
                    >
                      {allGraphData?.visualFourId ? (
                        <React.Fragment>
                          <div className="earning-text full-width">
                            {allGraphData?.visualFourId?.allData?.name}
                          </div>
                          <div>
                            <Charts
                              xaxis={allGraphData?.visualFourId?.allData?.x}
                              yaxis={allGraphData?.visualFourId?.allData?.y}
                              type={allGraphData?.visualFourId?.allData?.graphType}
                              isCustomCss
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div>
                          <PlusOutlined className="plus-icon" />
                        </div>
                      )}
                    </div>
                    {allGraphData?.visualFourId && (
                      <DeleteOutlined
                        style={{ float: 'right', position: 'absolute' }}
                        onClick={() => handleRemove('visualFourId')}
                      />
                    )}
                  </ScrollAnimation>
                </div>
              </div>
              {addModel && (
                <SelectGraph
                  visible={addModel}
                  onCancel={handleModel}
                  getGraphData={getGraphData}
                  currentKey={currentKey}
                />
              )}
            </div>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default AddVisulization;
