import './App.css';
import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './component/home/Home';
import SignUp from './component/sign/sign_up';
import SignIn from './component/sign/sign_in';
import ResetPass from './component/sign/resetPass';
import About from './component/main_pages/about';
import Contact from './component/main_pages/contact';
import Term from './component/main_pages/tearm';
import Privacy from './component/main_pages/privacy';
import Gallery from './component/main_pages/gallery';
import NotFound from './component/main_pages/404';
import Membership from './component/membership/membership';
import Mix from './component/main_pages/mix';
import Collaboration from './component/main_pages/collaboration';
import Education from './component/main_pages/edu';
import Distribute from './component/main_pages/distribute';
import Publish from './component/main_pages/publisher';
import Profile from './component/App/user_profile/profile';
import MusicBuddies from './component/App/music_buddies/music_buddies';
import ProfileView from './component/App/profile_view';
import License from './component/App/license/license';
import VydyaSongcosmos from './component/App/vydiaEmberd';
import ImroSongcosmos from './component/App/imroEmberd';
import CheckoutWrap from './component/App/checkout';
import Inbox from './component/App/inbox/inbox';

// Admin
import Dashbord from './component/admin/dashbord';



function App() {


  return (
    <ChakraProvider>
      <Router>
      <div>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/resetPass" element={<ResetPass />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/term" element={<Term />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/mix" element={<Mix />} />
          <Route path="/music-buddies" element={<Collaboration />} />
          <Route path="/edu" element={<Education />} />
          <Route path="/distribute" element={<Distribute />} />
          <Route path="/publish" element={<Publish />} />
          


          {/* App pages */}
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/music-buddies" element={<MusicBuddies />} />
          <Route path="/app/user" element={<ProfileView />} />
          <Route path="/app/license" element={<License />} />
          <Route path="/app/distribute-vydia" element={<VydyaSongcosmos />} />
          <Route path="/app/imro-songcosmos" element={<ImroSongcosmos />} />
          <Route path="/app/checkout" element={<CheckoutWrap />} />
          <Route path="/app/inbox" element={<Inbox />} />


          {/* admin pages */}
          <Route path="/sc-admin" element={<Dashbord />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      </Router>

      
    </ChakraProvider>
  );
}

export default App;
