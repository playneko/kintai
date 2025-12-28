import React, { useState } from 'react';
import dayjs from 'dayjs';
import '../assets/Home.css';

function Home() {
  dayjs.locale('ja');
  const [selectedDate] = useState(dayjs().toDate()); // 현재 선택된 날짜

  const formatDate = (createdAt) => {
    return dayjs(createdAt).format("YYYY年 MM月 DD日");
  };

  return (
    <div className="App">
      <div className="home-container">
        {formatDate(selectedDate)}
      </div>
    </div>
  );
}

export default Home;