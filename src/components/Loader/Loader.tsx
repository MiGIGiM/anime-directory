import { FC } from "react";
import style from '../../../styles/Loader.module.css';
const Loader: FC<{title: string}> = ({ title }) => (
  <div className={style.loader}>{ title }</div>
)

export default Loader;