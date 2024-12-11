/* 리액트 실행에 필요한 기본 라이브러리 */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* URL설정을 위한 라이브러리 */
import { BrowserRouter as Router } from 'react-router-dom';

/* 모든 페이지의 최상위 페이지를 불러온다. */
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /* Router로 페이지들을 감싸줌으로써 URL설정을 할 수 있다. */
  <Router>
    <App />
  </Router>
);

reportWebVitals();
