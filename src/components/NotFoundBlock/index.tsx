import { FC } from 'react';

import s from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={s.discription}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
