import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import FriendDiscoveryAndManagement from "pages/friend-discovery-and-management";
import RealTimeChatInterface from "pages/real-time-chat-interface";
import UserProfileManagement from "pages/user-profile-management";
import MediaGalleryAndViewer from "pages/media-gallery-and-viewer";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/friend-discovery-and-management" element={<FriendDiscoveryAndManagement />} />
        <Route path="/real-time-chat-interface" element={<RealTimeChatInterface />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/media-gallery-and-viewer" element={<MediaGalleryAndViewer />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;