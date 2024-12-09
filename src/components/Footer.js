import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className='FooterContainer'>
      <div className='FooterContent'>
        <div className='FooterLinkContainer'>
          <h1 className='FooterLinkTitle'>넷플릭스 대한민국</h1>
          <div className='FooterLinkContent'>
            <a
              href='https://help.netflix.com/ko/node/412'
              className='FooterLink'
            >
              넷플릭스 소개
            </a>
            <a href='https://help.netflix.com/ko/' className='FooterLink'>
              고객 센터
            </a>
            <a href='https://help.netflix.com/ko/' className='FooterLink'>
              미디어 센터
            </a>
            <a href='https://help.netflix.com/ko/' className='FooterLink'>
              이용 약관
            </a>
          </div>
          <div className='FooterDescContainer'>
            <div className='FooterDescRights'>
              © 2021 Netflix, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
