import React from 'react';
// import {icon}  from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
// import LastFM from '../Assets/Images/lastFMlogo.png';


const Footer = () => {

 

  return (

    <footer class="small bg-light fixed-bottom ">
      <div class="  ">
        <div class="row justify-content-md-center py-2">
          <div class="col-md-auto">
           <a href="https://github.com/CoffeeEyes28/Medley"><GitHubIcon /></a>
          </div>
          <div class="col-md-auto">
            <a href="https://twitter.com/"><TwitterIcon /></a>
          </div>
          <div class="col-md-auto">
            <a href="https://www.facebook.com/"><FacebookIcon /></a>
          </div>
        </div>
        <div class="row justify-content-md-center py-2">
          <div class="col-md-auto">
            <ul class="list-inline">
              <li class="list-inline-item">&copy; 2022 Created By <CopyrightIcon />ampNerd, Inc.</li>
              <li class="list-inline-item">All rights reserved.</li>
              <br></br>
              <div class="row justify-content-md-center py-2">
              <div class="col-md-auto">
              <li>Powered By LastFM</li>
              </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;