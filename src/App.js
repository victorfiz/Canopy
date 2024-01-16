import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interview from "./pages/Interview/Interview";
import Review from "./pages/Review/Review";
import SignUp from "./pages/Auth/SignUp";
import Account from "./pages/Account/Account";
import Login from "./pages/Auth/Login";
import React, { useEffect, useState } from "react";
import ErrorPage from "./pages/404/ErrorPage";
import HomePage from './pages/HomePage/HomePage.js';
import Pricing from './pages/Pricing/Pricing.js';
import Success from './pages/PaymentRedirect/Success.js';
import MyReviews from './pages/MyReviews/MyReviews.js';
import Instructions from "./pages/Instructions/Instructions";
import ResetPassword from './pages/Auth/ResetPassword.js';
import Interests from './pages/Interests/Interests.js';
import Role from './pages/Role/Role.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import InterviewShort from "./pages/Questionnaires/InterviewShort";
import SettingUp from "./pages/SettingUp/SettingUp";
import Polls from "./pages/Polls/Polls.js";




import Promo from './pages/promo/Promo.js';


import Create from './adminPages/create/Create.js';
import Templates from "./adminPages/Templates/Templates";
import EditCategories from "./adminPages/categories/Categories";
import Generator from "./adminPages/Generator/Generator";
import Promocodes from "./adminPages/promocodes/Promocodes"
import Live from "./adminPages/Live/Live";
import Interviews from "./adminPages/Interviews/Interviews";
import Roles from "./pages/Roles/Roles";
import CreateRole from "./adminPages/createRole/CreateRole";
import AllRoles from "./adminPages/allRoles/AllRoles";
import DocumentViewer from "./adminPages/documentViewer/DocumentViewer";

import Users from "./adminPages/users/Users";
import User from "./adminPages/user/User";

import { useAuth } from './auth';
import { usePostHog } from 'posthog-js/react'
import { AnimatePresence } from 'framer-motion';

import './css/general.css'
import './css/homepage.css'
import './css/review.css'
import './css/media.css'
import './css/ycombinator.css'
import './css/pricing.css'
import './css/category.css'
import './css/header.css'
import './css/interview.css'
import './css/create.css'
import './css/templates.css'


import './css/components/button.css'
import './css/components/footer.css'
import './css/components/focusView.css'
import './css/components/verticalBox.css'
import './css/components/textfield.css'
import './css/components/banner.css'
import './css/components/infoHover.css'
import './css/components/menu.css'
import './css/components/table.css'
import './css/components/sidebar.css'
import './css/components/formField.css'


function App() {
  const [interviewId, setInterviewId] = useState(null)

  window.setInterviewId = setInterviewId
  window.interviewId = interviewId;
  window.isUseCreateSocketHookMounted = false;

  const posthog = usePostHog();
  const { authUser } = useAuth();


  useEffect(() => {
    if (authUser) {
      console.log("authUser", authUser);
      posthog?.identify(authUser.uid, {
        email: authUser.email,
      })
    }
  }, [posthog, authUser])


  // useEffect(()=>{
  //   posthog.init('phc_9Ncb5V1XYnCUUWWO5bRtahKLNVlHWWhuCzBqAWFUGrX', { api_host: 'https://eu.posthog.com' })

  // }, [])

  return (
    <Router>

      <div className="App">
        <AnimatePresence wait>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* application */}
            <Route path="/interests" element={<Interests />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/account" element={<Account />} />
            <Route path="/interview/:interviewId" element={<Interview />} />
            <Route path="/myreviews" element={<MyReviews />} />
            <Route path="/review/:reviewId" element={<Review />} />
            <Route path="/instructions/:interviewId" element={<Instructions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/successful/:uid" element={<Success />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/role/:roleId" element={<Role />} />
            <Route path="/settingup" element={<SettingUp />} />

            <Route path="/interview-short/:interviewId" element={<InterviewShort />} />







            {/* auth */}

            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/document" element={<DocumentViewer />} />
            <Route path="/polls/:pollId/:uid/:option" element={<Polls />} />



            {/* admin */}
            <Route path="/create/:interviewTemplateId" element={<Create />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/categories" element={<EditCategories />} />
            <Route path="/create-generator/:careerId" element={<Generator />} />
            <Route path="/promocodes" element={<Promocodes />} />
            <Route path="/live/:interviewId" element={<Live />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:uid" element={<User />} />
            <Route path="/create" element={<Templates />} />
            <Route path="/create-role/:roleId" element={<CreateRole />} />
            <Route path="/all-roles" element={<AllRoles />} />



            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;