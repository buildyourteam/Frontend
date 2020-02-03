import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "Project",
  initialState: {
    isLoading: false,
    isError: false,
    Default: {
      open: false,
      text: ""
    },
    // project 상세페이지 초기 데이터
    project: {
      imgUrl: "",
      projectName: "",
      teamName: "",
      currentMember: {
        developer: 0,
        planner: 0,
        other: 0,
        designer: 0
      },
      needMember: {
        developer: 0,
        planner: 0,
        other: 0,
        designer: 0
      },
      endDate: 0,
      projectDescription: "",
      memberList: [{ userId: "", status: 0 }]
    },
    // 메인페이지 project card 데이터
    projectCard: [
      {
        imgUrl: "",
        projectName: "",
        teamName: "",
        currentMember: {
          developer: 0,
          planner: 0,
          other: 0,
          designer: 0
        },
        needMember: {
          developer: 0,
          planner: 0,
          other: 0,
          designer: 0
        },
        Dday: 0
      }
    ]
  },
  reducers: {
    //project list용
    getProjectData(state, action) {
      state.isLoading = true;
    },
    getProjectDataSuccess(state, action) {
      state.projectCard = action.payload;
      state.isLoading = false;
    },
    getProjectFail(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    //메인페이지 project용(인기, 추천, 신규)
    getMainData(state, action) {
      state.isLoading = true;
    },
    getMainDataSuccess(state, action) {
      state.isLoading = false;
      state.projectCard = action.payload;
    },
    //project detail 페이지 용
    getProjectDetail(state, action) {
      state.isLoading = true;
    },
    getProjectDetailSuccess(state, action) {
      state.project = action.payload;
      state.isLoading = false;
    },
    setProjectDetail(state, action) {
      state.isLoading = true;
    },
    setProjectDetailSuccess(state, action) {
      state.isLoading = false;
      state.project = action.payload;
    }
  }
});

export const {
  getProjectData,
  getProjectDataSuccess,
  getProjectFail,
  getMainData,
  getMainDataSuccess,
  getProjectDetail,
  getProjectDetailSuccess,
  setProjectDetail,
  setProjectDetailSuccess
} = projectSlice.actions;
export default projectSlice.reducer;
