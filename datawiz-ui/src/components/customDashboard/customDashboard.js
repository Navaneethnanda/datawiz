import React, { useState, useEffect } from 'react';
import { Button, Layout, Pagination, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollAnimation from 'react-animate-on-scroll';
import Loader from '../../shared/loader/Loader';
import TopHeader from '../../shared/top-header/top-header';
import AddCustomDashboard from './addCustomDashboard';
import ApiUtils from '../../helpers/APIUtils';

const api = new ApiUtils();

const { Content } = Layout;

const CustomDashboard = () => {
  const history = useHistory();

  const [loader, setLoader] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [totalElement, setTotalElement] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [allData, setAllData] = useState([]);
  const { userId } = useSelector(state => state.auth.user);

  const handleLoader = bool => {
    setLoader(bool);
  };

  const handleModel = (bool, method, data) => {
    if (method === 'add') setAddModel(bool);
    else if (method === 'redirect') {
      history.push(`/customComparison/${data.dashboardId}`, {
        data,
      });
    }
  };

  const getData = async () => {
    handleLoader(true);
    try {
      const bodyData = {
        userId,
        pageNumber,
      };

      const res = await api.getAllCustomDashboards(bodyData);

      setAllData(res?.data?.data);
      setTotalElement(res?.data?.totalPages * 6);

      handleLoader(false);
    } catch (e) {
      handleLoader(false);
    }
  };

  const handleDelete = async id => {
    try {
      await api.deleteCustomDashboard(id);
      getData();
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {});

  return (
    <Layout>
      {loader ? (
        <Loader />
      ) : (
        <React.Fragment>
          <TopHeader title="Custom Dashboard" link={false} name={undefined} />
          <Content>
            <div>
              <div className="site-layout-background">
                <ScrollAnimation
                  animateOnce
                  className="full-width single-box"
                  animateIn="fadeIn"
                  delay={500}
                >
                  <div className="search-box full-width category-page date-calender-section calenderWidth large">
                    <div className="flex">
                      <Button
                        className="reset-btn"
                        style={{ padding: '10px' }}
                        onClick={() => handleModel(true, 'add', null)}
                      >
                        {/* <img src={`${S3BucketURL}commissary/add-icon.svg`} alt="Add Category" />{' '} */}
                        Add Custom Dashboard
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="site-layout-background">
                <div className="top-boxes full-width">
                  {allData.length > 0 &&
                    allData.map((element, index) => (
                      <ScrollAnimation
                        animateOnce
                        className="full-width single-box"
                        animateIn="fadeInUp"
                        delay={index * 300}
                      >
                        <div
                          className="full-width"
                          key={element.dashboardId}
                          role="presentation"
                          onClick={() => handleModel(true, 'redirect', element)}
                        >
                          <div style={{ display: 'flex' }}>
                            <img
                              className="not-hover-show"
                              src="images/order-icon.svg"
                              alt="product"
                            />
                            <img className="hover-show" src="images/order-icon.svg" alt="product" />
                          </div>
                          <div className="earning-text full-width">{element.name}</div>
                        </div>
                        <span className="full-width icon-class">
                          <Tooltip title="Delete" onClick={() => handleDelete(element.dashboardId)}>
                            <DeleteOutlined />
                          </Tooltip>
                        </span>
                      </ScrollAnimation>
                    ))}
                </div>

                {allData.length > 0 && (
                  <div className="custom-pagination-footer pagination-footer">
                    <Pagination
                      style={{ marginTop: '15px' }}
                      defaultPageSize="6"
                      defaultCurrent={pageNumber + 1}
                      total={totalElement}
                      onChange={e => setPageNumber(e - 1)}
                    />
                  </div>
                )}
                {addModel && (
                  <AddCustomDashboard visible={addModel} onCancel={handleModel} getData={getData} />
                )}
              </div>
            </div>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default CustomDashboard;
