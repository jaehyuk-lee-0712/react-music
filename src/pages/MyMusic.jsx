import React from 'react';
import useFetchData from '../hook/useFetchData';

import Loading from '../components/Loading';
import Error from '../components/Error';
import Chart from '../components/Chart';

const Mymusic = () => {
  const { data, loading, error } = useFetchData('./data/yih.json');

  if (loading) return <Loading loading={loading} />;
  if (error) return <Error message={error.message} />;

  return (
    <section id='myMusic'>
      <Chart
        title="봉팔이의 라디오"
        data={data}
        showCalendar={false}
      />
    </section>
  );
}

export default Mymusic;