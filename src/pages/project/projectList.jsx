import React, { useState } from "react";
import {
  useProjectListState,
  useProjectListEffect,
  useRequest,
} from "../../hook";
import { Link } from "react-router-dom";
import { Layout, ProjectBox, Button } from "../../components";
import { Row, Col } from "reactstrap";
import Sort from "../../components/List/Sort";

export default function ProjectList() {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [stack, setStack] = useState("");
  const [search, setSearch] = useState("");

  const [projectList, projectListAction] = useProjectListState();
  const [
    {
      data: resProjectList,
      fulfilled: getProjectListFulfilled,
      pending: getProjectListPending,
      rejected: getProjectListRejected,
      error: getProjectListError,
    },
    { run: getProjectListApi },
  ] = useRequest(projectListAction.getProjectList);
  useProjectListEffect(
    resProjectList,
    getProjectListFulfilled,
    getProjectListRejected,
    getProjectListError,
    getProjectListApi,
    projectListAction.setProjectList
  );

  return (
    <Layout>
      <hr />
      <Sort
        role={role}
        setRole={setRole}
        region={region}
        setRegion={setRegion}
        stack={stack}
        setStack={setStack}
        search={search}
        setSearch={setSearch}
      />
      <Link to="/createProject">
        <Button>프로젝트 생성</Button>
      </Link>
      <hr />
      <h1>{role}</h1>
      <h1>{region}</h1>
      <h1>{stack}</h1>
      <h1>{search}</h1>
      <Row xs="12">
        {projectList.map((value, index) => {
          return (
            <Link to={`/projectDetail/${value.projectId}`}>
              <Col xs="3" key={index}>
                <ProjectBox
                  data={value}
                  onClick={() => handleClickProject(projectId)}
                />
              </Col>
            </Link>
          );
        })}
      </Row>
    </Layout>
  );
}