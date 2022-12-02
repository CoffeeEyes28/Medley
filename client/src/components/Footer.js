import React from 'react';
// import {icon}  from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (

    <footer class="small bg-light ">
      <div class="container py-3 py-sm-4">
        <div class="row justify-content-md-center py-2">
          <div class="col-md-auto">
           <a href="#"><GitHubIcon /></a>
          </div>
          <div class="col-md-auto">
            <a href="#"><TwitterIcon /></a>
          </div>
          <div class="col-md-auto">
            <a href="#"><FacebookIcon /></a>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-9">
            <ul class="list-inline">
              <li class="list-inline-item">&copy; 2022 Created By <CopyrightIcon />ampNerd, Inc.</li>
              <li class="list-inline-item">All rights reserved.</li>
              <br></br>
              <li>Powered By LastFM</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;