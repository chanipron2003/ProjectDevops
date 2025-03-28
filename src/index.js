// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // สไตล์สำหรับแอป
import App from './App'; // คอมโพเนนต์หลักของแอป
import reportWebVitals from './reportWebVitals'; // สำหรับการติดตามประสิทธิภาพ

// Render App component ไปยัง root div ใน index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // ทำให้ React สามารถอัพเดต DOM ได้
);

// ถ้าคุณต้องการติดตามประสิทธิภาพของแอป
reportWebVitals();
