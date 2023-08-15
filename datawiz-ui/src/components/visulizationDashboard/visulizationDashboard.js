import React, { useEffect, useState } from 'react';
import { Layout, Button, Pagination } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import Loader from '../../shared/loader/Loader';
import TopHeader from '../../shared/top-header/top-header';
import ApiUtils from '../../helpers/APIUtils';
import Chart from '../../shared/Chart/chart';

const api = msg => new ApiUtils(msg);

const { Content } = Layout;

const VisulizationDashboard = () => {
  const location = useLocation();
  const history = useHistory();

  const title = location.state.name;
  const [loader, setLoader] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalPages, setTotlaPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const payloadObject = {
    connectionId: window.location.pathname.split('/')[2],
    database: null,
    table: null,
  };

  const handleLoader = bool => {
    setLoader(bool);
  };

  const getData = async () => {
    handleLoader(true);
    try {
      const res = await api(true).getAllGraphData(payloadObject.connectionId, pageNumber);

      setAllData(res?.data?.data);
      setTotlaPages(res?.data?.totalPages * 6);

      handleLoader(false);
    } catch (e) {
      handleLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, [pageNumber]);

  return (
    <Layout>
      {loader ? (
        <Loader />
      ) : (
        <React.Fragment>
          <TopHeader title={`${title} Dashboard`} link={false} name={undefined} />
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
                        onClick={() =>
                          history.push(`/visualization/add/${payloadObject?.connectionId}`, {
                            name: title,
                          })
                        }
                      >
                        Add Graph
                      </Button>
                    </div>

                    <div className="flex">
                      <Button className="reset-btn" onClick={() => getData()}>
                        Refresh
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              <div className="top-boxes full-width">
                {allData.length > 0 &&
                  allData.map((element, index) => (
                    <ScrollAnimation
                      animateOnce
                      className="full-width single-box graph-box"
                      animateIn="fadeInUp"
                      delay={index * 300}
                      style={{ width: 'auto', paddingBottom: '50px' }}
                    >
                      <div
                        className="full-width"
                        key={element.visualizationId}
                        role="presentation"
                        onClick={() =>
                          history.push(
                            `/visualization/edit/${payloadObject?.connectionId}/${element.visualizationId}`,
                            {
                              name: title,
                            }
                          )
                        }
                      >
                        <div className="earning-text full-width">{element.name}</div>
                        <Chart
                          xaxis={element.x}
                          yaxis={element.y}
                          type={element.graphType}
                          isCustomCss
                        />
                      </div>
                    </ScrollAnimation>
                  ))}
              </div>
            </div>

            {allData.length > 0 && (
              <div className="custom-pagination-footer pagination-footer">
                <Pagination
                  style={{ marginTop: '15px' }}
                  defaultPageSize="6"
                  defaultCurrent={pageNumber + 1}
                  total={totalPages}
                  onChange={e => setPageNumber(e - 1)}
                />
              </div>
            )}
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default VisulizationDashboard;
