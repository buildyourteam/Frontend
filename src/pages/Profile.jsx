import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, ProfileInfo, ProfileInfoModify } from "../components";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import classnames from "classnames";

const Profile = () => {
  // url에서 userId 추출
  const location = useLocation();
  const url = location.pathname.split("/");
  const userId = url[2];

  // 컴포넌트 이동을 다룰 변수
  const [modifying, setModifying] = useState(false);

  // modify창 열고 닫을 토글
  const modifyToggle = () => {
    setModifying(!modifying);
  };

  const [infoState, setInfoState] = useState({
    userName: "",
    role: "",
    stacks: [""],
    contact: "",
    area: "",
    grade: 0,
    introduction: ""
  });

  const [imgState, setImgState] = useState({
    imgUrl: "",
    isImgChange: false
  });

  // 우측 탭 상태변수
  const [activeTab, setActiveTab] = useState("1");

  // 탭 토글
  const tabToggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Layout>
      <br />
      <Row xs="4">
        <Col>
          {modifying ? (
            <ProfileInfoModify
              setModifying={modifyToggle}
              infoState={infoState}
              setInfoState={setInfoState}
              imgState={imgState}
              setImgState={setImgState}
              userId={userId}
            />
          ) : (
            <>
              <ProfileInfo
                setModifying={modifyToggle}
                infoState={infoState}
                setInfoState={setInfoState}
                imgState={imgState}
                setImgState={setImgState}
                userId={userId}
              />
              <Button onClick={modifyToggle}>Modify</Button>
            </>
          )}
        </Col>
        <Col xs="9">
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    tabToggle("1");
                  }}
                >
                  Completed Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    tabToggle("2");
                  }}
                >
                  Running Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    tabToggle("3");
                  }}
                >
                  Planned Projects
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">sdfsd</TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
