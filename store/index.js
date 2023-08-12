import { createStore } from "vuex";
import { supabase } from "/api/supabaseClient";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

const toast = useToast();

export default createStore({
  state: {
    user: null,
    profile: null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    projectSelected: null,
    taskStatus: null,
    loading: true,
    projectDetail: null,
    sprintDrag: null,
    sprintOldValue: null,
    reportGenerated: null,
    memberListed: null
  },
  mutations: {
    loginUser(state, value) {
      state.user = value;
    },
    setToken(state, value) {
      state.token = value;
    },
    setProjectSelected(state, value) {
      state.projectSelected = value;
    },
    setTaskStatus(state, value) {
      state.taskStatus = value;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setProjectDetail(state, value) {
      state.projectDetail = value;
    },
    setSprintDrag(state, value) {
      state.sprintDrag = value;
    },   
    setSprintOldValue(state, value) {
      state.sprintOldValue = value;
    },     
    setProfile(state, value) {
      state.profile = value;
    }, 
    setReportGenerated(state, value) {
      state.reportGenerated = value;
    },     
    setMemberListed(state, value) {
      state.memberListed = value;
    },      
  },
  getters: {
    loginUser: (state) => {
      return state.user;
    },
    token: (state) => {
      return state.token;
    },
    projectSelected: (state) => {
      return state.projectSelected;
    },
    taskStatus: (state) => {
      return state.taskStatus;
    },
    loading: (state) => {
      return state.loading;
    },
    getSprintDrag: (state) => {
      return state.sprintDrag;
    },
    getSprintOldValue: (state) => {
      return state.sprintOldValue;
    },  
    getReportGenerated: (state) => {
      return state.reportGenerated;
    }, 
    getMemberListed: (state) => {
      return state.memberListed;
    }, 
  },
  actions: {
    async loginUser({ commit }, value) {
      try {
        const loggedIn = await supabase.auth.signInWithPassword(value);
        if (loggedIn.error) {
          toast.error(loggedIn.error.message);
          return "error";
        } else {
          localStorage.setItem("token", loggedIn.data.session.access_token);
          this.state.user = loggedIn.data.user;
          this.state.token = loggedIn.data.session.access_token;
          toast.success("Login Successfully");
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", this.state.user.id);
          localStorage.setItem("profile", JSON.stringify(data[0]));
          this.state.profile = JSON.parse(localStorage.getItem("profile"));
          return "success";
        }
      } catch (error) {
        toast.error(error);
      }
    },
    async register({ commit }, value) {
      try {
        const loggedIn = await supabase.auth.signUp(value);
        const { data, error } = await supabase
          .from("profiles")
          .update({
            full_name:
              value.options.data.first_name +
              " " +
              value.options.data.last_name,
            username:
              value.options.data.first_name + "" + value.options.data.last_name,
          })
          .eq("id", loggedIn.data.user.id);
        toast.success("Register User");
      } catch (error) {
        toast.error(error);
      }
    },
    async googleLogin({ commit }) {
      try {
        const loggedIn = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
        if (loggedIn.error) {
          alert(JSON.stringify(loggedIn));
          toast.error(loggedIn.error.message);
          return "error";
        } else {
          this.state.user = loggedIn.data.user;
          this.state.token = loggedIn.data.session.access_token;
          localStorage.setItem("token", loggedIn.data.session.access_token);
          toast.success("Login Successfully");
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", this.state.user.id);
          localStorage.setItem("profile", JSON.stringify(data[0]));
          this.state.profile = JSON.parse(localStorage.getItem("profile"));
          return "success";
        }
      } catch (error) {
        toast.error(error);
      }
    },
    async requestDemo({ commit }, value) {
      try {
        const requestDemo = await supabase.from("request_demo").insert([
          {
            fullname: value.fullname,
            phonenumber: value.phoneno,
            email: value.email,
            subject: value.subject,
            message: value.message,
          },
        ]);
        if (requestDemo.status === 201) {
          toast.success(
            "We have noted your query and we will contact you soon"
          );
        }
      } catch (error) {
        toast.error(error);
      }
    },
    async verifyLogin({ commit }) {
      const token = await localStorage.getItem("token");
      if (token != "null") {
        const tokenData = localStorage.getItem("token");
        const timeStamp = Math.round(new Date() / 1000);
        var decoded = jwt_decode(tokenData);
        if (timeStamp >= decoded.exp) {
          localStorage.removeItem("token");
          const { error } = await supabase.auth.signOut();
          localStorage.removeItem("profile");
          this.state.user = null;
          this.state.token = null;
          this.state.profile = null;
          toast.error("Login Expired");
        } else {
          this.state.token = localStorage.getItem("token");
          this.state.user = decoded;
          this.state.profile = JSON.parse(localStorage.getItem("profile"));
        }
      } else {
        return "notVerify";
      }
    },
    async project({ commit }, value) {
      if (
        localStorage.getItem("token") != null ||
        localStorage.getItem("token") != []
      ) {
        const userId = this.state?.user?.id || this.state?.user?.sub;
        let referencedRow = await supabase
          .from("team")
          .select("*, profiles ( username, full_name, role )")
          .eq("user_id", userId);

        const idPresets = referencedRow.data;
        const referencedProjectId = idPresets.map((row) => row.project_id);

        let project = await supabase
          .from("project")
          .select(
            "*, team ( designation, user_id(id, username,website,full_name,avatar_url,role) )"
          )
          .in("id", referencedProjectId);
        return project.data;
      }
    },
    async projectTypes({ commit }, value) {
      let projectTypes = await supabase.from("project_type").select("*");
      return projectTypes.data;
    },

    async projectDetail({ commit }, value) {
      let projectDetail = await supabase
        .from("project")
        .select("*")
        .eq("id", value);
      return projectDetail.data;
    },

    async projectIssues({ commit }, value) {
      let projectTypes = await supabase
        .from("tasks")
        .select(
          "*, status_task ( id, name, color_indicator ), profiles!tasks_assign_to_fkey ( id, username, avatar_url, role )"
        )
        .eq("project_id", value);
      return projectTypes.data;
    },

    async addProject({ commit }, value) {
      if (value.uploadImage) {
        const userId = this.state?.user?.id || this.state?.user?.sub;
        let date = dayjs().format()
        let projectimage = await supabase.storage
          .from("project")
          .upload(value.name+''+date, value.uploadImage);
        let dataImage = projectimage.data.path;
        let projectImageUrl = supabase.storage
          .from("project")
          .getPublicUrl(dataImage);
        let orginiation = await supabase.from("project").insert([
          {
            name: value.name,
            description: value.description,
            project_image: projectImageUrl.data.publicUrl,
            type: value.type,
            project_created: userId,
            project_status: 1,
          },
        ]);
        let checkOrginization = await supabase
          .from("project")
          .select("*")
          .eq("name", value.name);
        let team = await supabase.from("team").insert([
          {
            designation: "Owner",
            project_id: checkOrginization.data[0].id,
            user_id: userId,
          },
        ]);
        toast.success("New Project Added");
        return orginiation.data;
      }
      if (!value.uploadImage) {
        const userId = this.state?.user?.id || this.state?.user?.sub;
        let orginiation = await supabase.from("project").insert([
          {
            name: value.name,
            description: value.description,
            type: value.type,
            project_created: userId,
          },
        ]);
        let checkOrginization = await supabase
          .from("project")
          .select("*")
          .eq("name", value.name);
        let team = await supabase.from("team").insert([
          {
            designation: "Owner",
            project_id: checkOrginization.data[0].id,
            user_id: userId,
          },
        ]);
        toast.success("New Project Added");
        return orginiation.data;
      }
    },

    async updateProject({ commit }, value) {
        const userId = this.state?.user?.id || this.state?.user?.sub;
        let date = dayjs().format()
        let projectimage = await supabase.storage
          .from("project")
          .upload(value.name+''+date, value.uploadImage);
        let dataImage = projectimage.data.path;
        let projectImageUrl = supabase.storage
          .from("project")
          .getPublicUrl(dataImage);
        let updateProject = await supabase.from("project").update([
          {
            name: value.name,
            description: value.description,
            project_image: projectImageUrl.data.publicUrl,
            type: value.type,
            project_created: userId,
            project_status: 1,
          },
        ]).eq("id", value.id);
        
        toast.success("Project Updated");
        return updateProject.data;
    },

    async updateSettings({ commit }, value) {
      const userId = this.state?.user?.id || this.state?.user?.sub;
      if(value.uploadImage !== null) {
      let date = dayjs().format()
      let projectimage = await supabase.storage
      .from("avatars")
      .upload(value.fullname+''+date, value.uploadImage);
    let dataImage = projectimage.data.path;
    let projectImageUrl = supabase.storage
      .from("avatars")
      .getPublicUrl(dataImage);

      let updateSettings = await supabase.from("profiles").update([
        {
          username: value.username,
          full_name: value.fullname,
          avatar_url: projectImageUrl.data.publicUrl,
          website: value.website,
          role: value.role,
          updated_at: date,
        },
      ]).eq("id", userId);
      toast.success("Account Updated");
      return updateSettings;
    }
    else{
      let date = dayjs().format()

      let updateSettings = await supabase.from("profiles").update([
        {
          username: value.username,
          full_name: value.fullname,
          website: value.website,
          role: value.role,
          updated_at: date,
        },
      ]).eq("id", userId);
      toast.success("Account Updated"); 
      return updateSettings;
    }
    },
    

    async getUserSetting({ commit }, value) {
      const userId = this.state?.user?.id || this.state?.user?.sub;
      let updateSettings = await supabase.from("profiles").select("*").eq("id", userId);
      return updateSettings.data;
    },


    async taskStatus({ commit }) {
      let taskStatus = await supabase.from("status_task").select("*");
      this.state.taskStatus = taskStatus.data;
    },

    async userProfile({ commit }, value) {
      let profile = await supabase
        .from("profiles")
        .select("*")
        .neq("id", this.state?.profile?.id);
      return profile.data;
    },

    async assignuserProfile({ commit }, value) {
      let assignProfile = await supabase
        .from("team")
        .select("*, user_id( id, username, full_name, avatar_url, role )", )
        .eq("project_id", value)
        .neq("user_id", this.state?.profile?.id);
      return assignProfile.data;
    },

    async teamMembers({ commit }, value) {
      let teamMembers = await supabase
        .from("team")
        .select("*, user_id( id, username, full_name, avatar_url, role )", )
        .eq("project_id", value)
      return teamMembers.data;
    },

    async addMembertoProject({ commit }, value) {
      let addTeamMember = await supabase
        .from("profiles")
        .select("*")
        .neq("id", this.state?.profile?.id)
      return addTeamMember.data;
    },



    async addIssue({ commit }, value) {
      if (value.uploadImage) {
        let projectimage = await supabase.storage
          .from("task")
          .upload(value.task_name, value.uploadImage);
        let projectImageUrl = supabase.storage
          .from("task")
          .getPublicUrl(projectimage.data.path);
        let tasks = await supabase.from("tasks").insert([
          {
            project_id: value.project_id,
            task_name: value.task_name,
            task_description: value.task_description,
            task_status_id: value.task_status_id,
            assign_to: value.assign_to,
            task_image: projectImageUrl.data.publicUrl,
          },
        ]);
        return tasks.data;
      }
      if (!value.uploadImage) {
        let tasks = await supabase.from("tasks").insert([
          {
            project_id: value.project_id,
            task_name: value.task_name,
            task_description: value.task_description,
            task_status_id: value.task_status_id,
            assign_to: value.assign_to,
          },
        ]);
        return tasks.data;
      }
    },

    async requestDemoData({ commit }, value) {
      let requestDemo = await supabase
        .from("request_demo")
        .select("*")
      return requestDemo.data;
    },


    async taskDetail({ commit }, value) {
		let taskDetail = await supabase
		  .from("tasks")
		  .select(
			"*, status_task ( id, name, color_indicator ), profiles!tasks_assign_to_fkey ( id, username, avatar_url, role ), task_comments (comment, image, created_at, commentBy(username,full_name,avatar_url,role))"
		  )
		  .eq("project_id", value.projectid)
		  .eq("id", value.taskid);
		return taskDetail.data;
	},
  async getProfileDetail({ commit }, value) {
		let profileDetail = await supabase
		  .from("profiles")
		  .select(
			"*"
		  )
		  .eq("id", value)
		return profileDetail.data;
	},  
  async addComment({ commit }, value) {
    const userId = this.state?.user?.id || this.state?.user?.sub;
    let comment = await supabase.from("task_comments").insert([
      {
        comment: value.comment,
        commentBy: userId,
        taskid: value.taskid,
      },
    ]);
    if(comment.status === 201){
      toast.success("Comment Added");
    }
    else{
      toast.error(comment.error);
    }
  },

  async changeTaskStatus({ commit }, value) {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          task_status_id: value.statusid
        })
        .eq("id", value.taskid);
      toast.success('Task Status Changed');
    } catch (error) {
      toast.error(error);
    }
  },


  async archiveProject({ commit }, value) {
    try {
      const { data, error } = await supabase
        .from("project")
        .update({
          project_status: 2
        })
        .eq("id", value);
      toast.error('Project Archived');
    } catch (error) {
      toast.error(error);
    }
  },

  async activeProject({ commit }, value) {
    try {
      const { data, error } = await supabase
        .from("project")
        .update({
          project_status: 1
        })
        .eq("id", value);
      toast.success('Project is Active');
    } catch (error) {
      toast.error(error);
    }
  },
  async statusTask({ commit }, value) {
    let statusTask = await supabase
      .from("status_task")
      .select(
        "*"
      );
    return statusTask.data;
  },

  async addTeamMember({ commit }, value) {
    let team = await supabase.from("team").insert([
      {
        designation: value.designation,
        project_id: value.project_id,
        user_id: value.userId,
      },
    ]);
    toast.success("New Member Added");
    return team.data;
  },

  async removeTeamMember({ commit }, value) {
    let team = await supabase
    .from("team")
    .delete()
    .eq('project_id', value.projectID)
    .eq('user_id', value.userID)

    toast.error(value.username + " is Removed form Project");
    return team.data;
  },

  async inviteUser({ commit }, value) {
    let inviteUser = await supabase.auth.admin.inviteUserByEmail(value)
    if(inviteUser.error){
      toast.error(inviteUser.error.message);
    }
    if(!inviteUser.error){
      toast.success('Invite Send to User');
    }
    // toast.error(value.username + " is Removed form Project");
    return inviteUser;
  },

  async createUserPassword({ commit }, value) {
    let createUserPassword = await supabase.auth.admin.updateUserById(
      value.userid,
      { password: value.password }
    )
    toast.success('Password Changed');
    // toast.error(value.username + " is Removed form Project");
    return createUserPassword;
  },

  async signInWithGoogle({ commit }, value) {
  // const { user, session, error } = await supabase.auth.signIn({
  //   provider: 'google',
  // });
  const { error } = await supabase.auth.signIn({
    provider: 'google',
  }, { redirectTo: 'http://127.0.0.1:5173/projects/' });
  return error;
},
  async generateReport({ commit }, value) {
    await this.dispatch('taskStatus')
    let taskData = this.state.taskStatus
    let processData = {}

    await taskData.forEach(row => {   
      value.taskid = row.id 
      this.dispatch('processTaskDataGenerate', value).then((e) => {   
        processData[row.name] = e.data
      })
      this.state.reportGenerated = processData
    });
    return processData;
  },

  async processTaskDataGenerate({ commit }, value) {
    let processData = await supabase
      .from("tasks")
      .select("*")
      .gte('created_at', value.startDate)
      .lte('created_at', value.endDate)
      .eq("project_id", value.projectSelected)
      .eq("task_status_id", value.taskid);
    return processData;
  },


  async changePassword({ commit }, value) {
    let updatePassword = await supabase.auth.update({
      password: value,
    });
    return updatePassword;
  },


  async changeTaskEndDate({ commit }, value) {
    let taskEndDate = await supabase
      .from("tasks")
      .update({
        task_complete_data: value.endDate
      })
      .eq("id", value.taskid);
      if(taskEndDate.status === 204){
        toast.success("Task End Date Changed");
      }
      else{
        toast.success(taskEndDate.error);
      }
    return taskEndDate;
  },


    async logOut({ commit }) {
      await localStorage.removeItem("token");
      await localStorage.removeItem("profile");
      await supabase.auth.signOut();
      this.state.user = null;
      this.state.token = null;
      this.state.profile = null;
      toast.error("Sign Out");
    },
  },
});
